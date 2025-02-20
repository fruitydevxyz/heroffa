"use client"

import type React from "react"
import {useState} from "react"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"
import SkinViewer from "@/app/components/SkinViewer"
import StatsCard from "@/app/components/StatsCard"
import type {PlayerData, PlayerProfile} from "../types/player"

export default function Stats() {
    const [username, setUsername] = useState("")
    const [playerData, setPlayerData] = useState<PlayerData | null>(null)
    const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchPlayerData = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setPlayerData(null)
        setPlayerProfile(null)

        try {
            // First fetch UUID from Ashcon API
            const ashconResponse = await fetch(`https://api.ashcon.app/mojang/v2/user/${encodeURIComponent(username.trim())}`)

            if (!ashconResponse.ok) {
                throw new Error(`Ashcon API returned ${ashconResponse.status}`)
            }

            const ashconData = await ashconResponse.json()
            const playerProfile = {
                name: ashconData.username,
                uuid: ashconData.uuid, // Remove hyphens from UUID
            }
            setPlayerProfile(playerProfile)

            // Then fetch stats from HGLabor using the UUID
            try {
                const statsResponse = await fetch(`https://api.hglabor.de/stats/ffa/${playerProfile.uuid}`)

                if (!statsResponse.ok) {
                    if (statsResponse.status === 404) {
                        setPlayerData({
                            kills: 0,
                            deaths: 0,
                            xp: 0,
                            killstreak: 0,
                            peakKillstreak: 0,
                            bounty: 0,
                        })
                    } else {
                        throw new Error(`Stats API returned ${statsResponse.status}`)
                    }
                } else {
                    const statsData = await statsResponse.json()
                    setPlayerData(statsData)
                }
            } catch (statsError) {
                console.error("Stats API Error:", statsError)
                setPlayerData({
                    kills: 0,
                    deaths: 0,
                    xp: 0,
                    killstreak: 0,
                    peakKillstreak: 0,
                    bounty: 0,
                })
                setError("Player found but couldn't fetch stats")
            }
        } catch (error) {
            console.error("Error in fetch operation:", error)
            setError(error instanceof Error ? error.message : "Error fetching player data")
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <header className="bg-[#2a2a2a] border-b border-[#3a3a3a] p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#3498db] hover:text-[#2980b9] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/leaderboard" className="text-[#3498db] hover:text-[#2980b9] transition-colors">
                            Leaderboard
                        </Link>
                        <h1 className="text-2xl font-bold text-[#3498db]">HGLABOR HERO FFA</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <h2 className="text-xl mb-4 text-[#3498db]">Player Search</h2>
                    <form onSubmit={fetchPlayerData} className="flex gap-2">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Minecraft username"
                            className="flex-1 max-w-md bg-[#2a2a2a] border border-[#3a3a3a] text-white p-2 rounded focus:outline-none focus:border-[#3498db] transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#3498db] hover:bg-[#2980b9] text-white px-6 py-2 rounded transition-colors disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Search"}
                        </button>
                    </form>
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>

                {playerProfile && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <StatsCard playerProfile={playerProfile} playerData={playerData} />
                            {/* Add any additional cards below the stats if needed */}
                        </div>
                        <div className="lg:sticky lg:top-6 h-min">
                            <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-6">
                                <h2 className="text-xl mb-6 text-[#3498db]">Skin Preview</h2>
                                <div className="flex justify-center">
                                    <SkinViewer username={playerProfile.name} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

