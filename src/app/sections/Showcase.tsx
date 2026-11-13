'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CARDS = [
  { src: '/showcase-scrnsht1.png', alt: 'Daisy responding naturally in a Discord channel', label: 'Natural chat', description: 'Just @mention Daisy anywhere', tilt: -3, tape: 'bg-pink' },
  { src: '/showcase-scrnsht2.png', alt: "Daisy's available slash commands in Discord", label: 'Slash commands', description: 'Memory and persona, one / away', tilt: 2, tape: 'bg-sun' },
  { src: '/showcase-scrnsht3.png', alt: "Daisy's custom persona setup menu", label: 'Custom persona', description: 'Shape your dynamic, your way', tilt: -1.5, tape: 'bg-mint' },
]

export default function Showcase() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ctx: gsap.Context | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        if (reduced) return
        ctx = gsap.context(() => {
          gsap.from('[data-card]', { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)', clearProps: 'opacity,transform,translate,rotate,scale' })
        }, grid)
      },
      { threshold: 0.2 },
    )
    observer.observe(grid)
    return () => {
      observer.disconnect()
      ctx?.revert()
    }
  }, [])

  return (
    <section id="showcase" className="relative bg-cream-deep px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-sun-deep">See Daisy in action</p>
          <h2 className="font-fraunces text-[clamp(32px,5vw,52px)] font-semibold tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"SOFT" 100' }}>
            Right inside your Discord.
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-8">
          {CARDS.map((card) => (
            <div
              key={card.label}
              className="relative transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:z-10 hover:-translate-y-2 hover:scale-[1.04] hover:!rotate-0"
              style={{ rotate: `${card.tilt}deg` }}
            >
              <figure data-card className="relative rounded-2xl bg-white p-3 pb-5 shadow-[0_18px_40px_-18px_rgba(43,33,24,0.45)]">
                <span aria-hidden="true" className={`absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-sm opacity-90 ${card.tape}`} />
                <div className="relative h-60 overflow-hidden rounded-xl bg-[#313338]">
                  <Image src={card.src} alt={card.alt} fill className="object-contain p-2" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <figcaption className="px-2 pt-4">
                  <p className="font-fraunces text-xl font-semibold italic text-ink">{card.label}</p>
                  <p className="text-sm text-ink-soft">{card.description}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
