import { Link2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-10 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                                        <div className="h-4 w-48 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse" />
                                    </div>
                                    <div className="text-right space-y-2">
                                        <div className="h-8 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto" />
                                        <div className="h-3 w-16 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse ml-auto" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}
