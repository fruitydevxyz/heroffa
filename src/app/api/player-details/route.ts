import {NextResponse} from "next/server"

interface PlayerStats {
    playerId: string
    xp: number
    kills: number
    deaths: number
    currentKillStreak: number
    highestKillStreak: number
    bounty: number
    heroes: any[]
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get("id")

    if (!playerId) {
        return NextResponse.json({ error: "Player ID is required" }, { status: 400 })
    }

    try {
        // Note the lowercase 'ffa' here to match the working endpoint
        const response = await fetch(`https://api.hglabor.de/stats/ffa/${playerId}`)
        if (!response.ok) {
            throw new Error("Failed to fetch player stats")
        }
        const data: PlayerStats = await response.json()

        // Map the API response to match our interface
        const mappedData = {
            uuid: data.playerId,
            name: data.name || "Unknown Player",
            kills: data.kills || 0,
            deaths: data.deaths || 0,
            xp: data.xp || 0,
            killstreak: data.currentKillStreak || 0,
            peakKillstreak: data.highestKillStreak || 0,
            bounty: data.bounty || 0,
        }

        return NextResponse.json(mappedData)
    } catch (error) {
        console.error("Error fetching player details:", error)
        return NextResponse.json({ error: "Failed to fetch player details" }, { status: 500 })
    }
}

