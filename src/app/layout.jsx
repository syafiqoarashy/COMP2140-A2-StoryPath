import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'StoryPath',
  description: 'Create and explore virtual museum exhibits, location-based tours, and treasure hunts with clues.',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow mt-16 mb-16 p-4 w-full h-full">
          {children}
      </main>
      <Footer/>
      </body>
      </html>
  )
}