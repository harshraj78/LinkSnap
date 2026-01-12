import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { AnalyticsChart } from "@/components/analytics-chart"
import { ArrowLeft } from "lucide-react"

export default async function LinkDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session?.user) redirect("/login")

    const { id } = await params

    const link = await prisma.link.findUnique({
        where: { id },
        include: {
            analytics: {
                orderBy: { createdAt: "asc" }
            }
        }
    })

    if (!link || link.userId !== session.user.id) {
        notFound()
    }

    // Aggregate analytics by date for the chart
    const chartData = link.analytics.reduce((acc: any[], visit) => {
        const date = visit.createdAt.toISOString().split('T')[0]
        const existing = acc.find(item => item.date === date)
        if (existing) {
            existing.clicks += 1
        } else {
            acc.push({ date, clicks: 1 })
        }
        return acc
    }, [])

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <Link href="/dashboard" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition">
                    <ArrowLeft className="mr-2" size={16} /> Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">/{link.shortCode}</h1>
                            <p className="text-zinc-500">{link.originalUrl}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{link.visits}</p>
                            <p className="text-sm font-medium text-zinc-500 uppercase">Total Visits</p>
                        </div>
                    </div>

                    <div className="h-[400px] w-full mt-12">
                        <h3 className="text-lg font-semibold mb-6 text-zinc-900 dark:text-white">Performance Over Time</h3>
                        <AnalyticsChart data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
