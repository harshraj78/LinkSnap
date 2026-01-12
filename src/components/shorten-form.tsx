"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link2, Copy, Check, ArrowRight, Loader2, QrCode } from "lucide-react"
import QRCode from "react-qr-code"
import { cn } from "@/lib/utils"

export function ShortenForm() {
    const [url, setUrl] = useState("")
    const [customAlias, setCustomAlias] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ shortCode: string; originalUrl: string } | null>(null)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)
    const [showQR, setShowQR] = useState(false) // Placeholder for QR

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setResult(null)

        try {
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, customAlias: customAlias || undefined }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong")
            }

            setResult(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (!result) return
        const fullUrl = `${window.location.origin}/${result.shortCode}`
        navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-lg p-2 shadow-xl ring-1 ring-gray-900/5">
                        <Link2 className="ml-3 text-gray-400" size={20} />
                        <input
                            type="url"
                            placeholder="Paste your long link here..."
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="peer w-full bg-transparent p-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mr-1 rounded-md bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <input
                        type="text"
                        placeholder="Custom alias (optional)"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        className="text-sm bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-indigo-500 dark:text-gray-300 focus:outline-none w-48 text-right placeholder:text-gray-500"
                    />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-500 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 p-6 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="truncate">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-[200px]">{result.originalUrl}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <a
                                        href={`/${result.shortCode}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 truncate"
                                    >
                                        {typeof window !== 'undefined' ? window.location.host : ''}/{result.shortCode}
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                                    title="Copy Link"
                                >
                                    {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                </button>
                                <button
                                    onClick={() => setShowQR(!showQR)}
                                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                                    title="Show QR Code"
                                >
                                    <QrCode size={20} />
                                </button>
                            </div>
                        </div>

                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="mt-4 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-zinc-200"
                        >
                            <QRCode
                                value={`${window.location.host}/${result.shortCode}`}
                                size={128}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                viewBox={`0 0 256 256`}
                            />
                            <p className="mt-2 text-xs text-zinc-500 font-medium">Scan to visit</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
