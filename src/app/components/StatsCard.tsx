"use client"

import {useState} from "react"
import Image from "next/image"
import {ChevronDown, ChevronUp, X} from "lucide-react"
import xp from "../../../public/xp.gif"
import deaths from "../../../public/Minecraft-Skeleton-Head.jpg"
import kills from "../../../public/Iron_Sword_JE2_BE2.webp"
import bounty from "../../../public/Gold_Ingot_JE4_BE2.webp"
import type {PlayerStats} from "@/app/types/stats"
import UsernameDisplay from "@/app/components/UsernameDisplay"

interface StatsCardProps {
    playerUUID: string
    playerData: PlayerStats | null
}

export default function StatsCard({ playerUUID, playerData }: StatsCardProps) {
    const [showMore, setShowMore] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-4 sm:p-6">
            {/* Header with name and avatar */}
            <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl text-[#3498db]">
                    <UsernameDisplay uuid={playerUUID} />
                    's Statistiken
                </h2>
                <img
                    src={`https://crafatar.com/avatars/${playerUUID}?size=48&overlay`}
                    alt={`${playerUUID}'s Kopf`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded"
                />
            </div>

            {/* Main Stats */}
            {playerData ? (
                <div className="grid gap-3 sm:gap-4">
                    {/* Important Combat Stats */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                            <div className="flex items-center gap-2">
                                <Image src={kills || "/placeholder.svg"} alt="Kills" width={20} height={20} />
                                <span className="text-gray-400 text-xs sm:text-sm">Kills</span>
                            </div>
                            <span className="text-[#3498db] font-bold text-sm sm:text-base">{playerData.kills || 0}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                            <div className="flex items-center gap-2">
                                <Image src={deaths || "/placeholder.svg"} alt="Tode" width={20} height={20} />
                                <span className="text-gray-400 text-xs sm:text-sm">Tode</span>
                            </div>
                            <span className="text-[#e74c3c] font-bold text-sm sm:text-base">{playerData.deaths || 0}</span>
                        </div>
                    </div>

                    {/* K/D and XP */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xs sm:text-sm">K/D</span>
                            </div>
                            <span className="text-[#2ecc71] font-bold text-sm sm:text-base">
                {playerData.kills && playerData.deaths ? (playerData.kills / playerData.deaths).toFixed(2) : "N/A"}
              </span>
                        </div>
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                            <div className="flex items-center gap-2">
                                <Image src={xp || "/placeholder.svg"} alt="XP" width={20} height={20} />
                                <span className="text-gray-400 text-xs sm:text-sm">XP</span>
                            </div>
                            <span className="text-[#f1c40f] font-bold text-sm sm:text-base">{playerData.xp || 0}</span>
                        </div>
                    </div>

                    {/* Killstreaks */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xs sm:text-sm">Killstreak</span>
                            </div>
                            <span className="text-[#e67e22] font-bold text-sm sm:text-base">{playerData.currentKillStreak || 0}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xs sm:text-sm">Höchste KS</span>
                            </div>
                            <span className="text-[#9b59b6] font-bold text-sm sm:text-base">{playerData.highestKillStreak || 0}</span>
                        </div>
                    </div>

                    {/* Bounty */}
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                        <div className="flex items-center gap-2">
                            <Image src={bounty || "/placeholder.svg"} alt="Kopfgeld" width={20} height={20} />
                            <span className="text-gray-400 text-xs sm:text-sm">Kopfgeld</span>
                        </div>
                        <span className="text-[#2ecc71] font-bold text-sm sm:text-base">{playerData.bounty || 0}</span>
                    </div>

                    {/* Show More Button */}
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="flex items-center justify-center gap-2 w-full p-2 mt-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                    >
                        {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {showMore ? "Weniger anzeigen" : "Mehr anzeigen"}
                    </button>

                    {/* Additional Stats */}
                    {showMore && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 sm:p-3 bg-[#222] rounded">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 text-xs sm:text-sm">UUID</span>
                                </div>
                                <span className="font-mono text-xs sm:text-sm">{playerUUID}</span>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full p-2 sm:p-3 bg-[#3498db] text-white rounded hover:bg-[#2980b9] transition-colors text-xs sm:text-sm"
                            >
                                Zu faul, das zu implementieren – interessiert eh niemanden. 😴
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center p-4 bg-[#222] rounded">
                    <p className="text-gray-400 text-sm">Keine Statistiken für diesen Spieler verfügbar.</p>
                </div>
            )}

            {isModalOpen && playerData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-4 w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg sm:text-xl text-[#3498db]">Hero-Statistiken (Raw JSON)</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                        <pre className="bg-[#222] p-3 sm:p-4 rounded text-xs sm:text-sm text-white overflow-x-auto">
              {JSON.stringify(playerData.heroes, null, 2)}
            </pre>
                    </div>
                </div>
            )}
        </div>
    )
}

