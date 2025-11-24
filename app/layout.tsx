import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import InitialLoader from './components/InitialLoader'
import { ChatbotWrapper } from './components/ChatbotWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Railway Rule Clarifier AI',
  description: 'Comprehensive railway operating procedures and safety guidelines',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <InitialLoader>{children}</InitialLoader>
          <ChatbotWrapper />
        </Providers>
      </body>
    </html>
  )
}
