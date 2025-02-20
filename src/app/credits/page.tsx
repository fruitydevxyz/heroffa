import Link from "next/link"
import Image from "next/image"
import {ArrowLeft, Github, MessageCircle, Twitch, Youtube} from "lucide-react"
import logo from "../../../public/52cba49c32db0ea4369ad1ed4830ca00.webp"

export default function Credits() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white">
            <header className="bg-[#2a2a2a] border-b border-[#3a3a3a] p-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[#3498db] hover:text-[#2980b9] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Zurück zur Startseite</span>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Image src={logo || "/placeholder.svg"} alt="HERO FFA Logo" width={40} height={40} />
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 sm:p-6">
                <div className="bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] p-4 sm:p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-[#3498db]">
                        Über den Entwickler
                    </h1>

                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                        <div className="relative w-32 h-32 sm:w-48 sm:h-48">
                            <Image
                                src="/avatar.png"
                                alt="Entwickler Avatar"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full border-4 border-[#3498db]"
                            />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Hallo, ich bin Maggus!</h2>
                            <p className="mb-4 text-sm sm:text-base">
                                Hey, ich bin ein leidenschaftlicher Webentwickler und liebe es, coole und interaktive Sachen im Web zu
                                bauen. 🚀 Mit Technologien wie React, Next.js und TypeScript kenne ich mich bestens aus. Und Grüße and BigLawie...
                            </p>
                            <div className="flex gap-4 justify-center sm:justify-start">
                                <a
                                    href="https://github.com/Deadmake"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#3498db] hover:text-[#2980b9] transition-colors"
                                >
                                    <Github size={24} />
                                </a>
                                <a
                                    href="https://discord.gg/frty"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#3498db] hover:text-[#2980b9] transition-colors"
                                >
                                    <MessageCircle size={24} />
                                </a>
                                <a
                                    href="https://www.twitch.tv/deadmake"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#3498db] hover:text-[#2980b9] transition-colors"
                                >
                                    <Twitch size={24} />
                                </a>
                                <a
                                    href="https://www.youtube.com/@deadmake69"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#3498db] hover:text-[#2980b9] transition-colors"
                                >
                                    <Youtube size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center">
              <span role="img" aria-label="Zitrone" className="mr-2">
                🍋
              </span>
                            Fruity Services
                        </h3>
                        <p className="mb-4 text-sm sm:text-base">
                            Brauchst du eine moderne Website oder eine komplexe Web-App? Kein Ding! Ich helfe dir, deine Ideen in die
                            Realität umzusetzen. Lass uns was Cooles auf die Beine stellen! 💻🔥
                        </p>
                        <a
                            href="https://discord.gg/frty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white px-4 sm:px-6 py-2 rounded-full hover:from-[#2980b9] hover:to-[#3498db] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                        >
                            Fruity Services besuchen
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}

