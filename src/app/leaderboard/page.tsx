"use client"

import {useEffect, useMemo, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {ArrowLeft, ChevronDown, ChevronUp} from "lucide-react"
import StatsCard from "@/app/components/StatsCard"
import type {PlayerStats} from "@/app/types/stats"
import UsernameDisplay from "@/app/components/UsernameDisplay"
import logo from "../../../public/52cba49c32db0ea4369ad1ed4830ca00.webp"

interface LeaderboardEntry {
    page: number
    totalPages: number
    totalPlayers: number
    leaderboard: PlayerStats[]
}

const calculateKD = (kills: number, deaths: number) => {
    return deaths > 0 ? (kills / deaths).toFixed(2) : kills.toFixed(2)
}

export default function Page() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry | null>(null)
    const [sortBy, setSortBy] = useState<"kills" | "deaths" | "xp">("kills")
    const [page, setPage] = useState(1)
    const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null)

    const totalPlayers = useMemo(() => leaderboardData?.totalPlayers, [leaderboardData])

    useEffect(() => {
        function fetchLeaderboard() {
            setLoading(true)
            fetch(`/api/leaderboard?sort=${sortBy}&page=${page}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch leaderboard")
                    }
                    return response.json()
                })
                .then((data) => {
                    setLeaderboardData(data)
                    setLoading(false)
                })
                .catch((error) => {
                    setError("Fehler beim Laden der Bestenliste")
                    setLoading(false)
                })
        }

        fetchLeaderboard()
    }, [sortBy, page])

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <header className="bg-[#2a2a2a] border-b border-[#3a3a3a] p-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#3498db] hover:text-[#2980b9] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Zurück zur Startseite</span>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Image src={logo || "/placeholder.svg"} alt="HERO FFA Logo" width={40} height={40} />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3498db] border-t-transparent" />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    leaderboardData && (
                        <div className="grid gap-4 sm:gap-6">
                            <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                                        <h2 className="text-lg sm:text-xl text-[#3498db]">Top-Spieler</h2>
                                        <span>({totalPlayers})</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSortBy("kills")}
                                            className={`px-2 py-1 rounded text-xs sm:text-sm ${
                                                sortBy === "kills" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"
                                            }`}
                                        >
                                            Kills
                                        </button>
                                        <button
                                            onClick={() => setSortBy("deaths")}
                                            className={`px-2 py-1 rounded text-xs sm:text-sm ${
                                                sortBy === "deaths" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"
                                            }`}
                                        >
                                            Tode
                                        </button>
                                        <button
                                            onClick={() => setSortBy("xp")}
                                            className={`px-2 py-1 rounded text-xs sm:text-sm ${
                                                sortBy === "xp" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"
                                            }`}
                                        >
                                            XP
                                        </button>
                                    </div>
                                </div>
                                {leaderboardData.leaderboard.length === 0 ? (
                                    <div className="text-center text-gray-400 py-8">Keine Spieler gefunden</div>
                                ) : (
                                    <div className="space-y-2">
                                        {leaderboardData.leaderboard.map((player, index) => (
                                            <div key={player.playerId} className="bg-[#222] rounded p-3 sm:p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 sm:gap-4">
                            <span className="text-gray-400 w-6 sm:w-8 text-xs sm:text-sm">
                              #{(page - 1) * 20 + index + 1}
                            </span>
                                                        <img
                                                            src={`https://crafatar.com/avatars/${player.playerId}?size=32&overlay`}
                                                            alt={`${player.playerId}'s head`}
                                                            className="w-6 h-6 sm:w-8 sm:h-8 rounded"
                                                            crossOrigin="anonymous"
                                                        />
                                                        <span className="font-medium text-sm sm:text-base">
                              <UsernameDisplay uuid={player.playerId} />
                            </span>
                                                    </div>
                                                    <div className="flex gap-4 sm:gap-8 items-center">
                                                        <div className="text-right w-16 sm:w-20">
                                                            <div
                                                                className={`text-${
                                                                    sortBy === "kills" ? "[#3498db]" : sortBy === "deaths" ? "[#e74c3c]" : "[#f1c40f]"
                                                                } text-sm sm:text-base font-bold`}
                                                            >
                                                                {player[sortBy]}
                                                            </div>
                                                            <div className="text-xs text-gray-400">
                                                                {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                setExpandedPlayer(expandedPlayer === player.playerId ? null : player.playerId)
                                                            }
                                                            className="text-gray-400 hover:text-white transition-colors"
                                                        >
                                                            {expandedPlayer === player.playerId ? (
                                                                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                                            ) : (
                                                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                {expandedPlayer === player.playerId && (
                                                    <div className="mt-4 pt-4 border-t border-[#3a3a3a]">
                                                        <StatsCard playerUUID={player.playerId} playerData={player} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-6 flex justify-between items-center">
                                    <button
                                        onClick={() => {
                                            setLeaderboardData(null)
                                            setPage(page - 1)
                                        }}
                                        disabled={page === 1}
                                        className="px-3 py-1 sm:px-4 sm:py-2 bg-[#3498db] text-white rounded disabled:opacity-50 text-xs sm:text-sm"
                                    >
                                        Vorherige
                                    </button>
                                    <span className="text-xs sm:text-sm">
                    Seite {page} von {leaderboardData.totalPages}
                  </span>
                                    <button
                                        onClick={() => {
                                            setLeaderboardData(null)
                                            setPage(page + 1)
                                        }}
                                        disabled={leaderboardData.totalPages === page}
                                        className="px-3 py-1 sm:px-4 sm:py-2 bg-[#3498db] text-white rounded disabled:opacity-50 text-xs sm:text-sm"
                                    >
                                        Nächste
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </main>
        </div>
    )
}

