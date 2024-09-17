import './globals.css'

export const metadata = {
  title: 'StoryPath',
  description: 'Create and explore virtual museum exhibits, location-based tours, and treasure hunts with clues.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>StoryPath</h1>
          <nav>
            <a href="/">Home</a> | 
            <a href="/projects">Projects</a> | 
            <a href="/locations">Locations</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}