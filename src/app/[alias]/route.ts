import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ alias: string }> }
) {
    const { alias } = await params

    if (!alias) {
        return NextResponse.json({ error: "Missing alias" }, { status: 400 })
    }

    // Find the link
    const link = await prisma.link.findUnique({
        where: { shortCode: alias },
    })

    if (!link) {
        return NextResponse.json({ error: "Link not found" }, { status: 404 })
        // In a real app, you might redirect to a 404 page:
        // return NextResponse.redirect(new URL('/404', request.url))
    }

    // Track analytics (fire and forget pattern or await)
    // We await to ensure it's recorded before redirecting
    try {
        const ip = request.headers.get("x-forwarded-for") || "unknown"
        const userAgent = request.headers.get("user-agent") || "unknown"
        const referrer = request.headers.get("referer") || null

        // Simple/Naïve geo detection (would rely on Vercel headers in prod)
        const country = request.headers.get("x-vercel-ip-country") || null
        const city = request.headers.get("x-vercel-ip-city") || null

        await prisma.$transaction([
            prisma.link.update({
                where: { id: link.id },
                data: { visits: { increment: 1 } },
            }),
            prisma.analytics.create({
                data: {
                    linkId: link.id,
                    ip,
                    device: userAgent, // Simplified: storing full UA string in device for now
                    // In a real app we'd parse this string
                    country,
                    city,
                    referrer,
                },
            }),
        ])
    } catch (error) {
        console.error("Analytics Error:", error)
        // Don't fail the redirect if analytics fail
    }

    return NextResponse.redirect(link.originalUrl)
}
