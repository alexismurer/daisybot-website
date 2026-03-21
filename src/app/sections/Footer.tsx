'use client'

import Image from 'next/image'
import { INVITE_URL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: '1px solid rgba(88,101,242,0.08)', background: 'var(--bg)' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-center">
        {/* Left: logo + name */}
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <Image
            src="/daisybot.logo.png"
            alt="Daisy"
            width={32}
            height={32}
            style={{ borderRadius: '50%', width: 32, height: 32 }}
          />
          <span
            className="font-fraunces"
            style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 18, color: 'var(--text-heading)' }}
          >
            Daisy
          </span>
        </div>

        {/* Center: CTA */}
        <div className="flex justify-center">
          <a
            href={INVITE_URL}
            className="inline-flex items-center gap-2 font-manrope"
            style={{
              borderRadius: 4,
              background: '#5865F2',
              color: '#fff',
              fontWeight: 500,
              fontSize: 13,
              padding: '8px 16px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#4752C4' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#5865F2' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Add to Discord
          </a>
        </div>

        {/* Right: fine print */}
        <p
          className="font-manrope sm:text-right"
          style={{ fontSize: 11, fontWeight: 300, color: 'var(--text-muted)' }}
        >
          Made with ♥ — not affiliated with Discord Inc.
        </p>
      </div>
    </footer>
  )
}
