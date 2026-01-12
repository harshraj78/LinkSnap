import { ShortenForm } from "@/components/shorten-form"
import { auth } from "@/auth"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-white dark:bg-black selection:bg-purple-500 selection:text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-black [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20"></div>

      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="font-bold text-2xl tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Link</span>
          <span className="text-zinc-900 dark:text-zinc-100">Snap</span>
        </div>
        <div className="flex gap-4 items-center">
          {session ? (
            <Link href="/dashboard" className="text-sm font-medium px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition">
                Sign In
              </Link>
              <Link href="/login" className="text-sm font-medium px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center pt-24 pb-12 px-6">
        <div className="text-center max-w-3xl space-y-8 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Shorten Your Links. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Expand Your Reach.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A premium URL shortener built for performance and analytics.
            Create custom links, track clicks, and manage everything in one dashboard.
          </p>
        </div>

        <ShortenForm />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <FeatureCard
            title="Lightning Fast"
            desc="Redirects happen in milliseconds using our optimized edge network."
          />
          <FeatureCard
            title="Detailed Analytics"
            desc="Track clicks, geographic data, and device types in real-time."
          />
          <FeatureCard
            title="Custom Aliases"
            desc="Create branded links that users trust and click more often."
          />
        </div>
      </main>

      <footer className="py-12 text-center text-zinc-500 text-sm">
        <p>&copy; 2026 LinkSnap. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{desc}</p>
    </div>
  )
}
