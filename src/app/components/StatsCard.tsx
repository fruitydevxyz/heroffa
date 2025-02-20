"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import xp from "../../../public/xp.gif";
import deaths from "../../../public/Minecraft-Skeleton-Head.jpg";
import kills from "../../../public/Iron_Sword_JE2_BE2.webp";
import bounty from "../../../public/Gold_Ingot_JE4_BE2.webp";
import { PlayerStats } from "@/app/types/stats";
import UsernameDisplay from "@/app/components/UsernameDisplay";

interface StatsCardProps {
  playerData: PlayerStats;
}

export default function StatsCard({ playerData }: StatsCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-6">
      {/* Header with name and avatar */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl text-[#3498db]">
          <UsernameDisplay uuid={playerData.playerId} />
          's Stats
        </h2>
        <img
          src={`https://skins.danielraybone.com/v1/head/${encodeURIComponent(playerData.playerId)}?width=48&height=48`}
          alt={`${playerData.playerId}'s head`}
          className="w-12 h-12 rounded"
        />
      </div>

      {/* Main Stats */}
      <div className="grid gap-4">
        {/* Important Combat Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-between items-center p-3 bg-[#222] rounded">
            <div className="flex items-center gap-2">
              <Image src={kills} alt="Kills" width={24} height={24} />
              <span className="text-gray-400">Kills</span>
            </div>
            <span className="text-[#3498db] font-bold">
              {playerData?.kills || 0}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-[#222] rounded">
            <div className="flex items-center gap-2">
              <Image src={deaths} alt="Deaths" width={24} height={24} />
              <span className="text-gray-400">Deaths</span>
            </div>
            <span className="text-[#e74c3c] font-bold">
              {playerData?.deaths || 0}
            </span>
          </div>
        </div>

        {/* K/D and XP */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-between items-center p-3 bg-[#222] rounded">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">K/D</span>
            </div>
            <span className="text-[#2ecc71] font-bold">
              {playerData?.kills && playerData?.deaths
                ? (playerData.kills / playerData.deaths).toFixed(2)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-[#222] rounded">
            <div className="flex items-center gap-2">
              <Image src={xp} alt="XP" width={24} height={24} />
              <span className="text-gray-400">XP</span>
            </div>
            <span className="text-[#f1c40f] font-bold">
              {playerData?.xp || 0}
            </span>
          </div>
        </div>

        {/* Killstreaks */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-between items-center p-3 bg-[#222] rounded">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Killstreak</span>
            </div>
            <span className="text-[#e67e22] font-bold">
              {playerData?.currentKillStreak || 0}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-[#222] rounded">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Peak KS</span>
            </div>
            <span className="text-[#9b59b6] font-bold">
              {playerData?.highestKillStreak || 0}
            </span>
          </div>
        </div>

        {/* Bounty */}
        <div className="flex justify-between items-center p-3 bg-[#222] rounded">
          <div className="flex items-center gap-2">
            <Image src={bounty} alt="Bounty" width={24} height={24} />
            <span className="text-gray-400">Bounty</span>
          </div>
          <span className="text-[#2ecc71] font-bold">
            {playerData?.bounty || 0}
          </span>
        </div>

        {/* Show More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center justify-center gap-2 w-full p-2 mt-2 text-gray-400 hover:text-white transition-colors"
        >
          {showMore ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          {showMore ? "Show Less" : "Show More"}
        </button>

        {/* Additional Stats */}
        {showMore && (
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-[#222] rounded">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">UUID</span>
              </div>
              <span className="font-mono text-sm">{playerData.playerId}</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full p-3 bg-[#3498db] rounded"
            >
              Zu faul, das zu implementieren – interessiert eh niemanden. 😴
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-4 w-[600px] h-[600px] overflow-y-scroll bg-black rounded-md">
          <button onClick={() => setIsModalOpen(false)}>Close</button>
          <pre>{JSON.stringify(playerData.heroes, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
