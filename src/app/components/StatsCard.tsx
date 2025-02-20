"use client"

import {useState} from "react"
import Image from "next/image"
import {ChevronDown, ChevronUp} from "lucide-react"
import type {PlayerData, PlayerProfile} from "../types/player"
import xp from "../../../public/xp.gif"
import deaths from "../../../public/Minecraft-Skeleton-Head.jpg"
import kills from "../../../public/Iron_Sword_JE2_BE2.webp"
import bounty from "../../../public/Gold_Ingot_JE4_BE2.webp"

interface StatsCardProps {
    playerProfile: PlayerProfile
    playerData: PlayerData | null
}

export default function StatsCard({playerProfile, playerData}: StatsCardProps) {
    const [showMore, setShowMore] = useState(false)

    return (
        <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-6">
            {/* Header with name and avatar */}
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl text-[#3498db]">{playerProfile.name}'s Stats</h2>
                <img
                    src={`https://skins.danielraybone.com/v1/head/${encodeURIComponent(playerProfile.name)}?width=48&height=48`}
                    alt={`${playerProfile.name}'s head`}
                    className="w-12 h-12 rounded"
                />
            </div>

            {/* Main Stats */}
            <div className="grid gap-4">
                {/* Important Combat Stats */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                        <div className="flex items-center gap-2">
                            <Image src={kills} alt="Kills" width={24} height={24}/>
                            <span className="text-gray-400">Kills</span>
                        </div>
                        <span className="text-[#3498db] font-bold">{playerData?.kills || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                        <div className="flex items-center gap-2">
                            <Image src={deaths} alt="Deaths" width={24} height={24}/>
                            <span className="text-gray-400">Deaths</span>
                        </div>
                        <span className="text-[#e74c3c] font-bold">{playerData?.deaths || 0}</span>
                    </div>
                </div>

                {/* K/D and XP */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">K/D</span>
                        </div>
                        <span className="text-[#2ecc71] font-bold">
              {playerData?.kills && playerData?.deaths ? (playerData.kills / playerData.deaths).toFixed(2) : "N/A"}
            </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                        <div className="flex items-center gap-2">
                            <Image src={xp} alt="XP" width={24} height={24}/>
                            <span className="text-gray-400">XP</span>
                        </div>
                        <span className="text-[#f1c40f] font-bold">{playerData?.xp || 0}</span>
                    </div>
                </div>

                {/* Killstreaks */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">Killstreak</span>
                        </div>
                        <span className="text-[#e67e22] font-bold">{playerData?.killstreak || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">Peak KS</span>
                        </div>
                        <span className="text-[#9b59b6] font-bold">{playerData?.peakKillstreak || 0}</span>
                    </div>
                </div>

                {/* Bounty */}
                <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                    <div className="flex items-center gap-2">
                        <Image src={bounty} alt="Bounty" width={24} height={24}/>
                        <span className="text-gray-400">Bounty</span>
                    </div>
                    <span className="text-[#2ecc71] font-bold">{playerData?.bounty || 0}</span>
                </div>

                {/* Show More Button */}
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center justify-center gap-2 w-full p-2 mt-2 text-gray-400 hover:text-white transition-colors"
                >
                    {showMore ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                    {showMore ? "Show Less" : "Show More"}
                </button>

                {/* Additional Stats */}
                {showMore && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-[#222] rounded">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">UUID</span>
                            </div>
                            <span className="font-mono text-sm">{playerProfile.uuid}</span>
                        </div>
                        {/* Add any additional stats here */}
                    </div>
                )}
            </div>
        </div>
    )
}

