'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-black text-white shadow-sm z-10">
            <div className="text-xl font-bold">
                <Link href="/">STORYPATH</Link>
            </div>
            <div>
                <Button variant="ghost" asChild className="text-white hover:text-black">
                    <Link href="/projects">Projects</Link>
                </Button>
            </div>
        </nav>
    )
}