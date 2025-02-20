import {NextResponse} from "next/server"

interface PlayerStats {
    playerId: string
    name: string
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
    const sort = searchParams.get("sort") || "kills"
    const page = searchParams.get("page") || "1"

    try {
        const response = await fetch(`https://api.hglabor.de/stats/ffa/top?sort=${sort}&page=${page}`)
        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json([], { status: 200 })
            }
            throw new Error("Failed to fetch leaderboard data")
        }
        const data: PlayerStats[] = await response.json()

        // Map the API response to match our interface
        const mappedData = data.map((player) => ({
            uuid: player.playerId,
            name: player.name,
            kills: player.kills,
            deaths: player.deaths,
            xp: player.xp,
        }))

        return NextResponse.json(mappedData)
    } catch (error) {
        console.error("Error fetching leaderboard:", error)
        return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
    }
}

