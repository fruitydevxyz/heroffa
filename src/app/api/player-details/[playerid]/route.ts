import { NextResponse } from "next/server";

interface PlayerStats {
  playerId: string;
  xp: number;
  kills: number;
  deaths: number;
  currentKillStreak: number;
  highestKillStreak: number;
  bounty: number;
  heroes: any[];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ playerid?: string[] }> },
) {
  const awaitedParams = await params;

  if (!awaitedParams.playerid) {
    return NextResponse.json(
      { error: "Player ID is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.hglabor.de/stats/ffa/${awaitedParams.playerid}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch player stats");
    }
    const data: PlayerStats = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching player details:", error);
    return NextResponse.json(
      { error: "Failed to fetch player details" },
      { status: 500 },
    );
  }
}
