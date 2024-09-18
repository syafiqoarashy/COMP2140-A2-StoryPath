'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-black text-white shadow-sm z-10">
            <div className="text-sm">
                © 2024 StoryPath. All rights reserved.
            </div>
            <div>
                <Button variant="ghost" asChild className="text-white hover:text-black">
                    <Link href="/about">ABOUT US</Link>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:text-black">
                    <Link href="/contact">CONTACT</Link>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:text-black">
                    <Link href="/privacy">PRIVACY POLICY</Link>
                </Button>
            </div>
        </footer>
    )
}