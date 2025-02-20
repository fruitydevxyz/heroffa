import {NextResponse} from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")
    const type = searchParams.get("type")

    if (!username || !type) {
        return NextResponse.json({ error: "Username and type are required" }, { status: 400 })
    }

    try {
        let url: string
        if (type === "profile") {
            url = `https://skins.danielraybone.com/v1/profile/${encodeURIComponent(username)}`
        } else if (type === "skin") {
            url = `https://skins.danielraybone.com/v1/render/body/${encodeURIComponent(username)}?width=300&height=300`
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 })
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        if (type === "profile") {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            const buffer = await response.arrayBuffer()
            return new NextResponse(buffer, {
                status: 200,
                headers: {
                    "Content-Type": "image/png",
                    "Cache-Control": "public, max-age=3600",
                },
            })
        }
    } catch (error) {
        console.error("Error fetching Minecraft data:", error)
        return NextResponse.json({ error: "Failed to fetch Minecraft data" }, { status: 500 })
    }
}

