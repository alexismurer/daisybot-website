import type { Metadata } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces-var',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito-var',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://daisybot.vercel.app'),
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
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  )
}
