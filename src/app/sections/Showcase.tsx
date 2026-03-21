'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const CARDS = [
  { src: '/showcase-scrnsht1.png', alt: 'Daisy responding naturally in a Discord channel', label: 'Natural Chat', description: 'Just @mention Daisy anywhere' },
  { src: '/showcase-scrnsht2.png', alt: "Daisy's available slash commands in Discord", label: 'Slash Commands', description: 'Full command suite at your fingertips', raised: true },
  { src: '/showcase-scrnsht3.png', alt: "Daisy's custom persona setup menu", label: 'Custom Persona', description: 'Shape your dynamic, your way' },
]

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  // ── Curtain reveal on scroll into view ──────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const runReveal = async () => {
      const { gsap } = await import('gsap')
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.showcase-card')
      if (!cards) return

      cards.forEach((card, i) => {
        const curtain = card.querySelector<HTMLElement>('.showcase-curtain')
        if (!curtain) return
        if (prefersReduced) { gsap.set(curtain, { display: 'none' }); return }
        gsap.set(curtain, { yPercent: 0 })
        gsap.to(curtain, { yPercent: -100, duration: 0.7, delay: i * 0.15, ease: 'power3.inOut' })
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { runReveal(); observer.disconnect() } },
      { threshold: 0.15 },
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  // ── Base tilts + magnetic grow hover ────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.showcase-card')
    if (!cards) return

    const BASE: Array<{ rotation: number; y: number }> = [
      { rotation: -3, y: 0 },
      { rotation: 0,  y: -24 },
      { rotation: 3,  y: 0 },
    ]

    // Apply base tilts immediately
    import('gsap').then(({ gsap }) => {
      cards.forEach((card, i) => {
        gsap.set(card, { rotation: BASE[i].rotation, y: BASE[i].y })
      })
    })

    if (prefersReduced) return

    const cleanups: Array<() => void> = []

    cards.forEach((card, i) => {
      const base = BASE[i]

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 16
        const y = ((e.clientY - r.top)  / r.height - 0.5) * 12
        import('gsap').then(({ gsap }) => gsap.to(card, {
          x, y,
          rotation: base.rotation,
          scale: 1.15,
          zIndex: 10,
          boxShadow: '0 20px 50px rgba(88,101,242,0.3)',
          borderColor: 'rgba(88,101,242,0.45)',
          duration: 0.35,
          ease: 'power2.out',
        }))
      }
      const onLeave = () => import('gsap').then(({ gsap }) => gsap.to(card, {
        x: 0,
        y: base.y,
        rotation: base.rotation,
        scale: 1,
        zIndex: 1,
        boxShadow: 'none',
        borderColor: 'var(--brand-border)',
        duration: 0.55,
        ease: 'elastic.out(1, 0.55)',
      }))

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })
    return () => cleanups.forEach(fn => fn())
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        <p
          className="font-syne text-center mb-12"
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brand-accent-mid)' }}
        >
          See Daisy in Action
        </p>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {CARDS.map((card) => (
            <div
              key={card.label}
              className="showcase-card rounded-xl overflow-hidden"
              data-raised={card.raised ? 'true' : 'false'}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--brand-border)',
                position: 'relative',
                willChange: 'transform',
              }}
            >
              {/* Curtain overlay */}
              <div
                className="showcase-curtain"
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'var(--bg)',
                  zIndex: 10,
                  borderRadius: 12,
                  pointerEvents: 'none',
                }}
              />
              <div style={{ height: 220, position: 'relative' }}>
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="font-syne mb-1" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-heading)', letterSpacing: '0.05em' }}>
                  {card.label}
                </p>
                <p className="font-manrope" style={{ fontSize: 12, fontWeight: 300, color: 'var(--text-body)' }}>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
