import { NextResponse } from "next/server";
import { PlayerStats } from "@/app/types/stats";

const TOP_PLAYER_URL = "https://api.hglabor.de/stats/ffa/top";
const MAX_PAGE_SIZE = 20;

async function fetchAllPages(sort: string): Promise<PlayerStats[]> {
  let allPlayers: PlayerStats[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(`${TOP_PLAYER_URL}?sort=${sort}&page=${page}`);
    if (!response.ok) break;

    const data: PlayerStats[] = await response.json();
    if (data.length === 0) break;

    allPlayers = allPlayers.concat(data);
    page++;
  }

  return allPlayers;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort") || "kills";

  try {
    const allPlayers = await fetchAllPages(sort);
    const totalPlayers = allPlayers.length;
    const totalPages = Math.ceil(totalPlayers / MAX_PAGE_SIZE);

    const page = Math.min(totalPages, Number(searchParams.get("page")) || 1);

    const leaderboard = allPlayers.slice(
      (page - 1) * MAX_PAGE_SIZE,
      page * MAX_PAGE_SIZE,
    );

    return NextResponse.json({
      page,
      totalPages,
      totalPlayers,
      leaderboard,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
}
