"use client"

import {useCallback, useEffect, useState} from "react"
import Link from "next/link"
import {ArrowLeft, ChevronDown, ChevronUp} from "lucide-react"
import StatsCard from "@/app/components/StatsCard"

interface LeaderboardEntry {
    uuid: string
    name: string
    kills: number
    deaths: number
    xp: number
}

interface PlayerData {
    uuid: string
    name: string
    kills: number
    deaths: number
    xp: number
    killstreak: number
    peakKillstreak: number
    bounty: number
}

export default function Leaderboard() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const [sortBy, setSortBy] = useState<"kills" | "deaths" | "xp">("kills")
    const [page, setPage] = useState(1)
    const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null)
    const [expandedPlayerData, setExpandedPlayerData] = useState<PlayerData | null>(null)

    const fetchLeaderboard = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/leaderboard?sort=${sortBy}&page=${page}`)
            if (!response.ok) {
                throw new Error("Failed to fetch leaderboard")
            }
            const data: LeaderboardEntry[] = await response.json()
            setLeaderboard(data)
        } catch (error) {
            console.error("Error fetching leaderboard:", error)
            setError("Failed to load leaderboard")
        } finally {
            setLoading(false)
        }
    }, [sortBy, page])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/leaderboard?sort=${sortBy}&page=${page}&limit=20`)
                if (!response.ok) {
                    throw new Error("Failed to fetch leaderboard")
                }
                const data = await response.json()
                console.log("Leaderboard Data:", data) // Debug log
                setLeaderboard(data)
            } catch (error) {
                console.error("Error fetching leaderboard:", error)
                setError("Failed to load leaderboard")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [sortBy, page])

    const fetchPlayerDetails = async (uuid: string) => {
        try {
            const response = await fetch(`/api/player-details?id=${uuid}`)
            if (!response.ok) {
                throw new Error("Failed to fetch player details")
            }
            const data: PlayerData = await response.json()
            setExpandedPlayerData(data)
        } catch (error) {
            console.error("Error fetching player details:", error)
            setExpandedPlayerData(null)
        }
    }

    const handleSort = (newSortBy: "kills" | "deaths" | "xp") => {
        setSortBy(newSortBy)
        setPage(1)
    }

    const handleExpand = (uuid: string) => {
        if (expandedPlayer === uuid) {
            setExpandedPlayer(null)
            setExpandedPlayerData(null)
        } else {
            setExpandedPlayer(uuid)
            fetchPlayerDetails(uuid)
        }
    }

    const calculateKD = (kills: number, deaths: number) => {
        return deaths > 0 ? (kills / deaths).toFixed(2) : kills.toFixed(2)
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <header className="bg-[#2a2a2a] border-b border-[#3a3a3a] p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/stats"
                          className="flex items-center gap-2 text-[#3498db] hover:text-[#2980b9] transition-colors">
                        <ArrowLeft className="w-5 h-5"/>
                        Back to Stats
                    </Link>
                    <h1 className="text-2xl font-bold text-[#3498db]">HGLABOR HERO FFA Leaderboard</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-4 border-[#3498db] border-t-transparent"/>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <div className="grid gap-6">
                        <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl text-[#3498db]">Top Players</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSort("kills")}
                                        className={`px-2 py-1 rounded ${sortBy === "kills" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"}`}
                                    >
                                        Kills
                                    </button>
                                    <button
                                        onClick={() => handleSort("deaths")}
                                        className={`px-2 py-1 rounded ${sortBy === "deaths" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"}`}
                                    >
                                        Deaths
                                    </button>
                                    <button
                                        onClick={() => handleSort("xp")}
                                        className={`px-2 py-1 rounded ${sortBy === "xp" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"}`}
                                    >
                                        XP
                                    </button>
                                </div>
                            </div>
                            {leaderboard.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">No players found</div>
                            ) : (
                                <div className="space-y-2">
                                    {leaderboard.map((player, index) => (
                                        <div key={player.uuid} className="bg-[#222] rounded p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <span
                                                        className="text-gray-400 w-8">#{(page - 1) * 20 + index + 1}</span>
                                                    <img
                                                        src={`https://crafatar.com/avatars/${player.uuid}?size=32&overlay`}
                                                        alt={`${player.name}'s head`}
                                                        className="w-8 h-8 rounded"
                                                        crossOrigin="anonymous"
                                                    />
                                                    <span className="font-medium">{player.name}</span>
                                                </div>
                                                <div className="flex gap-8">
                                                    <div className="text-right">
                                                        <div className="text-[#3498db]">{player.kills}</div>
                                                        <div className="text-xs text-gray-400">Kills</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[#e74c3c]">{player.deaths}</div>
                                                        <div className="text-xs text-gray-400">Deaths</div>
                                                    </div>
                                                    <div className="text-right w-20">
                                                        <div
                                                            className="text-[#2ecc71]">{calculateKD(player.kills, player.deaths)}</div>
                                                        <div className="text-xs text-gray-400">K/D Ratio</div>
                                                    </div>
                                                    <div className="text-right w-20">
                                                        <div className="text-[#f1c40f]">{player.xp}</div>
                                                        <div className="text-xs text-gray-400">XP</div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleExpand(player.uuid)}
                                                        className="text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        {expandedPlayer === player.uuid ? (
                                                            <ChevronUp className="w-5 h-5"/>
                                                        ) : (
                                                            <ChevronDown className="w-5 h-5"/>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            {expandedPlayer === player.uuid && expandedPlayerData && (
                                                <div className="mt-4 pt-4 border-t border-[#3a3a3a]">
                                                    <StatsCard
                                                        playerProfile={{
                                                            name: expandedPlayerData.name,
                                                            uuid: expandedPlayerData.uuid,
                                                        }}
                                                        playerData={expandedPlayerData}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-6 flex justify-between items-center">
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-[#3498db] text-white rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span>
                  Page {page} (Players {(page - 1) * 20 + 1} - {page * 20})
                </span>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={leaderboard.length < 20}
                                    className="px-4 py-2 bg-[#3498db] text-white rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

