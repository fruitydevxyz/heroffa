"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import StatsCard from "@/app/components/StatsCard";
import { PlayerStats } from "@/app/types/stats";
import UsernameDisplay from "@/app/components/UsernameDisplay";

interface LeaderboardEntry {
  page: number;
  totalPages: number;
  totalPlayers: number;
  leaderboard: PlayerStats[];
}

const calculateKD = (kills: number, deaths: number) => {
  return deaths > 0 ? (kills / deaths).toFixed(2) : kills.toFixed(2);
};

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardEntry | null>(null);
  const [sortBy, setSortBy] = useState<"kills" | "deaths" | "xp">("kills");
  const [page, setPage] = useState(1);
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

  const totalPlayers = useMemo(
    () => leaderboardData?.totalPlayers,
    [leaderboardData],
  );

  useEffect(() => {
    function fetchLeaderboard() {
      setLoading(true);
      fetch(`/api/leaderboard?sort=${sortBy}&page=${page}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch leaderboard");
          }
          return response.json();
        })
        .then((data) => {
          setLeaderboardData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }

    fetchLeaderboard();
  }, [sortBy, page]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <header className="bg-[#2a2a2a] border-b border-[#3a3a3a] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/stats"
            className="flex items-center gap-2 text-[#3498db] hover:text-[#2980b9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Stats
          </Link>
          <h1 className="text-2xl font-bold text-[#3498db]">
            HERO FFA Leaderboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3498db] border-t-transparent" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          leaderboardData && (
            <div className="grid gap-6">
              <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl text-[#3498db]">Top Players</h2>
                    <span>({totalPlayers})</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy("kills")}
                      className={`px-2 py-1 rounded ${sortBy === "kills" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"}`}
                    >
                      Kills
                    </button>
                    <button
                      onClick={() => setSortBy("deaths")}
                      className={`px-2 py-1 rounded ${sortBy === "deaths" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"}`}
                    >
                      Deaths
                    </button>
                    <button
                      onClick={() => setSortBy("xp")}
                      className={`px-2 py-1 rounded ${sortBy === "xp" ? "bg-[#3498db] text-white" : "bg-[#222] text-gray-400"}`}
                    >
                      XP
                    </button>
                  </div>
                </div>
                {leaderboardData.leaderboard.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    No players found
                  </div>
                ) : (
                  <div className="space-y-2">
                    {leaderboardData.leaderboard.map((player, index) => (
                      <div
                        key={player.playerId}
                        className="bg-[#222] rounded p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-gray-400 w-8">
                              #{(page - 1) * 20 + index + 1}
                            </span>
                            <img
                              src={`https://crafatar.com/avatars/${player.playerId}?size=32&overlay`}
                              alt={`${player.playerId}'s head`}
                              className="w-8 h-8 rounded"
                              crossOrigin="anonymous"
                            />
                            <span className="font-medium">
                              <UsernameDisplay uuid={player.playerId} />
                            </span>
                          </div>
                          <div className="flex gap-8">
                            <div className="text-right">
                              <div className="text-[#3498db]">
                                {player.kills}
                              </div>
                              <div className="text-xs text-gray-400">Kills</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[#e74c3c]">
                                {player.deaths}
                              </div>
                              <div className="text-xs text-gray-400">
                                Deaths
                              </div>
                            </div>
                            <div className="text-right w-20">
                              <div className="text-[#2ecc71]">
                                {calculateKD(player.kills, player.deaths)}
                              </div>
                              <div className="text-xs text-gray-400">
                                K/D Ratio
                              </div>
                            </div>
                            <div className="text-right w-20">
                              <div className="text-[#f1c40f]">{player.xp}</div>
                              <div className="text-xs text-gray-400">XP</div>
                            </div>
                            <button
                              onClick={() =>
                                setExpandedPlayer(
                                  expandedPlayer === player.playerId
                                    ? null
                                    : player.playerId,
                                )
                              }
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              {expandedPlayer === player.playerId ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        {expandedPlayer === player.playerId && (
                          <div className="mt-4 pt-4 border-t border-[#3a3a3a]">
                            <StatsCard playerData={player} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => {
                      setLeaderboardData(null);
                      setPage(page - 1);
                    }}
                    disabled={page === 1}
                    className="px-4 py-2 bg-[#3498db] text-white rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {leaderboardData.totalPages}
                  </span>
                  <button
                    onClick={() => {
                      setLeaderboardData(null);
                      setPage(page + 1);
                    }}
                    disabled={leaderboardData.totalPages === page}
                    className="px-4 py-2 bg-[#3498db] text-white rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
