"use client"

import type React from "react"
import {useEffect, useState} from "react"
import Image from "next/image"

interface SkinViewerProps {
  username: string
}

const SkinViewer: React.FC<SkinViewerProps> = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [skinUrl, setSkinUrl] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    setSkinUrl(null)

    const fetchSkin = async () => {
      try {
        const response = await fetch(`/api/minecraft?username=${encodeURIComponent(username)}&type=skin`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setSkinUrl(url)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching skin:", error)
        setError("Failed to load skin")
        setIsLoading(false)
      }
    }

    fetchSkin()
  }, [username])

  if (isLoading) {
    return (
        <div className="w-full h-[300px] sm:h-[400px] bg-[#1a1a1a] rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-[#3498db] border-t-transparent" />
        </div>
    )
  }

  if (error) {
    return (
        <div className="w-full h-[300px] sm:h-[400px] bg-[#1a1a1a] rounded-lg flex items-center justify-center text-red-500 text-sm sm:text-base">
          {error}
        </div>
    )
  }

  return (
      <div className="w-full h-[300px] sm:h-[400px] bg-[#1a1a1a] rounded-lg flex items-center justify-center p-4">
        {skinUrl && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                  src={skinUrl || "/placeholder.svg"}
                  alt={`${username}'s Minecraft skin`}
                  layout="fill"
                  objectFit="contain"
                  priority
              />
            </div>
        )}
      </div>
  )
}

export default SkinViewer

