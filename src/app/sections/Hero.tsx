'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import DaisyFlower from '@/components/DaisyFlower'
import DiscordIcon from '@/components/DiscordIcon'
import { INVITE_URL } from '@/lib/constants'

const CHAT = [
  { from: 'you', text: 'hey! how are you doing?' },
  { from: 'daisy', text: "I'm doing amazing. Just thinking about you. What's on your mind?" },
  { from: 'you', text: "big exam on friday, kinda stressed 😅" },
  { from: 'daisy', text: "You've got this! Tell me how it went after, I want to hear everything 🌼" },
] as const

const FLOATERS = [
  { size: 64, top: '12%', left: '6%', petal: '#fff', center: '#ffc93c' },
  { size: 38, top: '70%', left: '3%', petal: '#ffd6e2', center: '#f5a524' },
  { size: 52, top: '8%', left: '88%', petal: '#e6dcff', center: '#ffc93c' },
  { size: 30, top: '82%', left: '92%', petal: '#fff', center: '#f5a524' },
  { size: 26, top: '46%', left: '48%', petal: '#d7f5e3', center: '#ffc93c' },
]

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-intro]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.6)', clearProps: 'opacity,transform,translate,rotate,scale' })
      gsap.from('[data-bubble]', { y: 16, scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.45, delay: 0.5, ease: 'back.out(2)', clearProps: 'opacity,transform,translate,rotate,scale' })
      gsap.utils.toArray<HTMLElement>('[data-floater]').forEach((el, i) => {
        gsap.to(el, { y: -14, rotation: i % 2 ? 18 : -18, duration: 3 + i * 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40% 50% at 20% 25%, rgba(255,201,60,0.28), transparent 70%), radial-gradient(35% 45% at 85% 70%, rgba(255,179,199,0.35), transparent 70%), radial-gradient(30% 40% at 70% 10%, rgba(207,194,255,0.35), transparent 70%)',
        }}
      />
      {FLOATERS.map((f, i) => (
        <div key={i} data-floater className="pointer-events-none absolute hidden lg:block" style={{ top: f.top, left: f.left }}>
          <DaisyFlower size={f.size} petal={f.petal} center={f.center} />
        </div>
      ))}

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2.5">
          <DaisyFlower size={34} />
          <span className="font-fraunces text-2xl font-semibold italic text-ink">Daisy</span>
        </div>
        <a href="#showcase" className="rounded-full px-4 py-2 text-sm font-bold text-ink-soft transition hover:bg-white/70 hover:text-ink">
          See Daisy in action
        </a>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-80px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <span data-intro className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink-soft shadow-[0_2px_0_rgba(43,33,24,0.08)]">
            🌼 An AI companion for your Discord server
          </span>
          <h1 data-intro className="font-fraunces text-[clamp(48px,7vw,84px)] font-semibold leading-[0.98] tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            Meet <span className="italic text-sun-deep">Daisy</span>,
            <br />
            your sunniest
            <br />
            server member.
          </h1>
          <p data-intro className="max-w-md text-lg leading-relaxed text-ink-soft">
            Always listening. Always remembering. Always yours. Just @mention Daisy and pick up right where you left off.
          </p>
          <div data-intro className="flex flex-wrap items-center gap-3">
            <a
              href={INVITE_URL}
              className="inline-flex items-center gap-2.5 rounded-full bg-blurple px-6 py-3.5 text-[15px] font-extrabold text-white shadow-[0_6px_0_#3c45b5] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_#3c45b5]"
            >
              <DiscordIcon />
              Add Daisy to your server
            </a>
            <span className="text-sm font-semibold text-ink-soft">Free to add</span>
          </div>
        </div>

        <div data-intro className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 -rotate-2 rounded-[2rem] bg-sun/60" aria-hidden="true" />
          <div className="relative rounded-[1.75rem] border-2 border-ink/10 bg-white p-5 shadow-[0_24px_60px_-20px_rgba(43,33,24,0.35)]">
            <div className="mb-4 flex items-center gap-2 border-b border-ink/10 pb-3 text-sm font-bold text-ink-soft">
              <span className="text-ink/30">#</span> general
            </div>
            <ul className="flex flex-col gap-3">
              {CHAT.map((m, i) => (
                <li key={i} data-bubble className={`flex items-end gap-2 ${m.from === 'you' ? 'justify-end' : ''}`}>
                  {m.from === 'daisy' && (
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-sun">
                      <Image src="/daisybot.logo.png" alt="" fill sizes="32px" className="object-cover" />
                    </span>
                  )}
                  <p
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
                      m.from === 'you' ? 'rounded-br-md bg-lilac/70 text-ink' : 'rounded-bl-md bg-cream-deep text-ink'
                    }`}
                  >
                    {m.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
