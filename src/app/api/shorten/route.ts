import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { generateShortCode } from "@/lib/utils"

export async function POST(req: NextRequest) {
    try {
        const { url, customAlias } = await req.json()

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        // Basic URL validation
        try {
            new URL(url)
        } catch {
            return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 })
        }

        let shortCode = customAlias

        // If custom alias provided, check uniqueness
        if (customAlias) {
            const existing = await prisma.link.findUnique({
                where: { shortCode: customAlias },
            })
            if (existing) {
                return NextResponse.json(
                    { error: "Alias already in use" },
                    { status: 409 }
                )
            }
        } else {
            // Generate unique short code
            let isUnique = false
            let attempts = 0
            while (!isUnique && attempts < 10) {
                shortCode = generateShortCode(6)
                const existing = await prisma.link.findUnique({
                    where: { shortCode },
                })
                if (!existing) {
                    isUnique = true
                }
                attempts++
            }

            if (!isUnique) {
                return NextResponse.json(
                    { error: "Failed to generate unique code, please try again" },
                    { status: 500 }
                )
            }
        }

        // Create the link
        const link = await prisma.link.create({
            data: {
                originalUrl: url,
                shortCode: shortCode!,
            },
        })

        return NextResponse.json({
            shortCode: link.shortCode,
            originalUrl: link.originalUrl,
            id: link.id,
        })

    } catch (error) {
        console.error("Shorten API Error:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
