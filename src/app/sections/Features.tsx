'use client'

import { useEffect, useRef } from 'react'

const FEATURE_ICONS = [
  <svg key="brain" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>,
  <svg key="sparkles" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  <svg key="image" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  <svg key="message" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
]

const FEATURES = [
  { heading: 'Persistent Memory', description: 'Daisy remembers facts about you across every session — no repetition, no starting over.' },
  { heading: 'Custom Persona', description: 'Set the dynamic that feels right: best friend, coach, romantic partner, or fully custom.' },
  { heading: 'Image Generation', description: 'Ask Daisy to paint something — it brings your imagination to life.' },
  { heading: 'Natural Conversation', description: 'No commands needed. Just @mention and talk.' },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // ── Entry: clip-path wipe + icon pop (Option B) ──────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let observer: IntersectionObserver | null = null

    const runAnimation = async () => {
      const { gsap } = await import('gsap')
      const { SplitText } = await import('gsap/SplitText')
      gsap.registerPlugin(SplitText)

      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.feature-cell')
      if (!cards) return

      cards.forEach((card, i) => {
        const icon    = card.querySelector<HTMLElement>('.feat-icon')
        const heading = card.querySelector<HTMLElement>('.feat-heading')
        const desc    = card.querySelector<HTMLElement>('.feat-desc')

        gsap.set(card, { clipPath: 'inset(100% 0 0 0)' })
        if (icon) gsap.set(icon, { scale: 0, opacity: 0 })

        gsap.to(card, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.55,
          delay: i * 0.12,
          ease: 'power3.out',
          onComplete() {
            gsap.set(card, { clearProps: 'clipPath' })
            if (icon) gsap.to(icon, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)' })
            if (heading) {
              const split = new SplitText(heading, { type: 'words' })
              gsap.from(split.words, {
                y: 8, opacity: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out',
                onComplete() { split.revert() },
              })
            }
            if (desc) gsap.from(desc, { opacity: 0, y: 4, duration: 0.4, ease: 'power2.out', delay: 0.12 })
          },
        })
      })
    }

    observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { runAnimation(); observer?.disconnect() } },
      { threshold: 0.15 },
    )
    if (gridRef.current) observer.observe(gridRef.current)

    return () => observer?.disconnect()
  }, [])

  // ── Hover: spotlight glow (Option C) ────────────────────────────────────
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.feature-cell')
    if (!cards) return

    const cleanups: Array<() => void> = []

    cards.forEach(card => {
      const spotlight = card.querySelector<HTMLElement>('.feat-spotlight')

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        if (spotlight) {
          spotlight.style.background = `radial-gradient(160px circle at ${x}px ${y}px, rgba(88,101,242,0.13) 0%, transparent 70%)`
          spotlight.style.opacity = '1'
        }
        import('gsap').then(({ gsap }) => {
          gsap.to(card, { borderColor: 'rgba(88,101,242,0.35)', duration: 0.2 })
        })
      }
      const onLeave = () => {
        if (spotlight) spotlight.style.opacity = '0'
        import('gsap').then(({ gsap }) => {
          gsap.to(card, { borderColor: 'var(--brand-border)', duration: 0.4 })
        })
      }

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
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-fraunces mb-4"
            style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 600, color: 'var(--text-heading)' }}
          >
            Everything you need.
          </h2>
          <p className="font-manrope" style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-body)' }}>
            One companion. Every dynamic.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.heading}
              className="feature-cell rounded-xl p-6"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--brand-border)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Spotlight layer */}
              <div
                className="feat-spotlight"
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, borderRadius: 12,
                  opacity: 0, pointerEvents: 'none',
                  transition: 'opacity 0.3s',
                }}
              />

              {/* Icon */}
              <div
                className="feat-icon mb-4"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(88,101,242,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--brand-accent-mid)',
                  position: 'relative', zIndex: 1,
                }}
              >
                {FEATURE_ICONS[i]}
              </div>

              <h3
                className="feat-heading font-syne mb-2"
                style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-heading)', letterSpacing: '0.04em', position: 'relative', zIndex: 1 }}
              >
                {f.heading}
              </h3>
              <p
                className="feat-desc font-manrope"
                style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-body)', lineHeight: 1.7, position: 'relative', zIndex: 1 }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
