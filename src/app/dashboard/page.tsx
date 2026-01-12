import { auth, signOut } from "@/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const links = await prisma.link.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { analytics: true }
            }
        }
    })

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            LinkSnap
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">{session.user.email}</span>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut()
                                }}
                            >
                                <button type="submit" className="text-sm text-red-600 hover:text-red-500 font-medium">
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Your Links</h1>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Create New
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    {links.length === 0 ? (
                        <div className="p-12 text-center text-zinc-500">
                            You haven't created any links yet.
                        </div>
                    ) : (
                        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {links.map((link) => (
                                <li key={link.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                                    <Link href={`/dashboard/${link.id}`} className="block p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-indigo-600 dark:text-indigo-400">
                                                    /{link.shortCode}
                                                </p>
                                                <p className="text-sm text-zinc-500 truncate max-w-md">
                                                    {link.originalUrl}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                                                    {link.visits}
                                                </p>
                                                <p className="text-xs text-zinc-500 uppercase tracking-wide">Click{link.visits !== 1 && 's'}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    )
}
