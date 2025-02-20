"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SkinViewerProps {
  username: string;
}

const SkinViewer: React.FC<SkinViewerProps> = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skinUrl, setSkinUrl] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setSkinUrl(null);

    const fetchSkin = async () => {
      try {
        const response = await fetch(
          `/api/minecraft?username=${encodeURIComponent(username)}&type=skin`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setSkinUrl(url);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching skin:", error);
        setError("Failed to load skin");
        setIsLoading(false);
      }
    };

    fetchSkin();
  }, [username]);

  if (isLoading) {
    return (
      <div className="w-[400px] h-[400px] bg-[#1a1a1a] rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#3498db] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[400px] h-[400px] bg-[#1a1a1a] rounded-lg flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-[400px] h-[400px] bg-[#1a1a1a] rounded-lg flex items-center justify-center p-4">
      {skinUrl && (
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          <Image
            src={skinUrl || "/placeholder.svg"}
            alt={`${username}'s Minecraft skin`}
            width={150}
            height={150}
            className="object-contain"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default SkinViewer;
