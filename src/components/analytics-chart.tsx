"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function AnalyticsChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-[200px] flex items-center justify-center text-zinc-400 text-sm">
                Not enough data to display chart.
            </div>
        )
    }

    // Aggregate data by date
    // Assuming 'data' needs processing or is already processed. 
    // For simplicity, let's assume data passed is an array of { date: string, count: number }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "#18181b", border: "none", color: "#fff", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                />
                <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#8b5cf6" // Purple
                    strokeWidth={3}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
