import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { Navbar } from './_components/Navbar'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.Js Starter',
  description: 'This is a Next.Js starter template.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /* Both next-themes and our own script will modify the root element in the client,
    we should then deactivate hydration mismatch warnings. */
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* next-themes uses the color-scheme CSS property to differentiate light and dark themes,
        but Tailwind is watching for a CSS class. */}
        <Script id="theme-detector">{`
          const theme = document.documentElement.style.colorScheme
          document.documentElement.classList.add(theme)
        `}</Script>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
