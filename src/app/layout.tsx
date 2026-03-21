import type { Metadata } from 'next'
import { Fraunces, Manrope, Syne, Space_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces-var',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-manrope-var',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-syne-var',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-space-mono-var',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://daisy-bot.vercel.app'),
  title: 'Daisy — Your AI Companion for Discord',
  description:
    'Always listening. Always remembering. Always yours. Add Daisy to your Discord server.',
  openGraph: {
    title: 'Daisy — Your AI Companion for Discord',
    description: 'Always listening. Always remembering. Always yours.',
    images: ['/daisybot.logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${syne.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
