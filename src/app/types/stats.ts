type PlayerStats = {
  playerId: string;
  xp: number;
  kills: number;
  deaths: number;
  currentKillStreak: number;
  highestKillStreak: number;
  bounty: number;
  heroes: Record<string, HeroStats>;
};

type HeroStats = Record<string, AbilityStats>;

type AbilityStats = Record<string, { experiencePoints: number }>;

export type { PlayerStats, HeroStats, AbilityStats };
