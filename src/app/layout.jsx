import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: 'StoryPath',
  description: 'Create and explore virtual museum exhibits, location-based tours, and treasure hunts with clues.',
}

/**
 * RootLayout component that wraps all pages in the application.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className="flex flex-col">
      <Navbar/>
      <main className="flex-grow px-4 w-full h-full">
          {children}
      </main>
      <Footer/>
      </body>
      </html>
  )
}