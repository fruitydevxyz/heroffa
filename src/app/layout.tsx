import type React from "react"
import type {Metadata} from "next"
import "./globals.css"
import {minecraft} from "../../font"

export const metadata: Metadata = {
    title: "HGLabor - Stats",
    description: "Moin Du liest das wirklich?",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <head>
            <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
            <script type="importmap">
                {`{
                            "imports": {
                                "three": "https://unpkg.com/three@0.150.1/build/three.module.js",
                                "three/addons/": "https://unpkg.com/three@0.150.1/examples/jsm/"
                            }
                        }`}
            </script>
        </head>
        <body className={`${minecraft.variable} antialiased`}>{children}</body>
        </html>
    )
}