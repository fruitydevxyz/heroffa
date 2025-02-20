import Image from "next/image"
import Link from "next/link"

import titleScreen from "../../../public/six.png"
import minecraft from "../../../public/minecraft.png"

export default function Home() {
    return (
        <div className="h-screen w-full">
            <div className="h-screen w-full flex justify-center items-center relative">
                <Image
                    src={titleScreen || "/placeholder.svg"}
                    alt="title-screen"
                    priority
                    className="absolute h-full w-full object-cover -z-10 bg-cover"
                />
                <div className="flex flex-col items-center gap-10 p-10 max-w-4xl">
                    <Image src={minecraft || "/placeholder.svg"} alt="minecraft-title" priority/>
                    <div className="flex flex-col gap-4">
                        <Link href="/stats" className="btn">
                            Stats
                        </Link>
                        <Link href="/leaderboard" className="btn">
                            Leaderboard
                        </Link>
                        <button className="btn">Credits</button>
                    </div>
                </div>
            </div>
        </div>
    )
}