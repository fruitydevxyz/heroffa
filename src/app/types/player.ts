export interface PlayerData {
    kills?: number
    deaths?: number
    xp?: number
    killstreak?: number
    peakKillstreak?: number
    bounty?: number
    // Add any other stats that the API provides
}

export interface PlayerProfile {
    name: string
    uuid: string
}

