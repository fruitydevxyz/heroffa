"use client"

import type React from "react"
import {useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {ArrowLeft} from "lucide-react"
import SkinViewer from "@/app/components/SkinViewer"
import StatsCard from "@/app/components/StatsCard"
import type {PlayerStats} from "@/app/types/stats"
import logo from '../../../public/52cba49c32db0ea4369ad1ed4830ca00.webp'

async function benutzernameZuUUID(username: string) {
  const ashconResponse = await fetch(`https://api.ashcon.app/mojang/v2/user/${encodeURIComponent(username.trim())}`)

  if (!ashconResponse.ok) {
    throw new Error(`Player not found`)
  }

  const ashconData = await ashconResponse.json()
  return ashconData.uuid
}

export default function Stats() {
  const [username, setUsername] = useState("")
  const [playerData, setPlayerData] = useState<PlayerStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [playerUUID, setPlayerUUID] = useState<string | null>(null)

  async function fetchPlayerData(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError("")
    setPlayerData(null)
    setPlayerUUID(null)

    try {
      const uuid = await benutzernameZuUUID(username)
      setPlayerUUID(uuid)

      const res = await fetch(`/api/player-details/${uuid}`)
      if (res.ok) {
        const data = await res.json()
        setPlayerData(data)
      } else {
        // Player exists but has no stats
        setPlayerData(null)
      }
    } catch (err) {
      setError("Spieler nicht gefunden")
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <header className="bg-[#2a2a2a] border-b border-[#3a3a3a] p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-[#3498db] hover:text-[#2980b9] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Zurück zur Startseite</span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link href="/leaderboard" className="text-[#3498db] hover:text-[#2980b9] transition-colors">
                Bestenliste
              </Link>
              <Image src={logo} alt="HERO FFA Logo" width={40} height={40} />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h2 className="text-xl mb-4 text-[#3498db]">Spielersuche</h2>
            <form onSubmit={fetchPlayerData} className="flex gap-2">
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Minecraft-Benutzername eingeben"
                  className="flex-1 max-w-md bg-[#2a2a2a] border border-[#3a3a3a] text-white p-2 rounded focus:outline-none focus:border-[#3498db] transition-colors"
              />
              <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#3498db] hover:bg-[#2980b9] text-white px-6 py-2 rounded transition-colors disabled:opacity-50"
              >
                {loading ? "Lädt..." : "Suchen"}
              </button>
            </form>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>

          {playerUUID && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                  <StatsCard playerUUID={playerUUID} playerData={playerData} />
                </div>
                <div className="lg:sticky lg:top-20 h-min">
                  <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-6">
                    <h2 className="text-xl mb-6 text-[#3498db]">Skin-Vorschau</h2>
                    <div className="flex justify-center">
                      <SkinViewer username={playerUUID} />
                    </div>
                  </div>
                </div>
              </div>
          )}
        </main>
      </div>
  )
}

