'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { INVITE_URL } from '@/lib/constants'

export default function Hero() {
  const outerRotateRef = useRef<HTMLDivElement>(null)
  const innerPulseRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringGlowRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const particleContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gsapCtx: { revert: () => void } | null = null
    const intervals: ReturnType<typeof setInterval>[] = []
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let splitInstance: { revert: () => void } | null = null

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    import('gsap').then(({ gsap }) => {
      import('gsap/SplitText').then(({ SplitText }) => {
        import('gsap/ScrollTrigger') // preload for other sections
        gsap.registerPlugin(SplitText)

        gsapCtx = gsap.context(() => {
          if (prefersReduced) {
            gsap.from([nameRef.current, taglineRef.current, ctaRef.current], {
              opacity: 0, duration: 0.6, stagger: 0.2,
            })
            return
          }

          // Logo entry
          gsap.from(outerRotateRef.current, { scale: 0.8, opacity: 0, duration: 0.7, ease: 'power3.out' })

          // Ambient rings
          gsap.to([ringRef.current, ringGlowRef.current], {
            rotation: 360, duration: 4, repeat: -1, ease: 'none',
          })

          // Particles
          const container = particleContainerRef.current
          if (container) {
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight * 0.38
            for (let i = 0; i < 12; i++) {
              const angle = Math.random() * Math.PI * 2
              const radius = 60 + Math.random() * 160
              const x = centerX + Math.cos(angle) * radius
              const startY = centerY + Math.sin(angle) * radius
              if (startY > centerY + 100) continue
              const size = 4 + Math.random() * 6
              const particle = document.createElement('div')
              particle.style.cssText = `position:absolute;left:${x}px;top:${startY}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(88,101,242,0.25);filter:blur(2px);pointer-events:none`
              container.appendChild(particle)
              gsap.to(particle, {
                y: -(80 + Math.random() * 80), opacity: 0,
                duration: 3 + Math.random() * 3, repeat: -1,
                delay: Math.random() * 4, ease: 'power1.out',
                onRepeat() { gsap.set(particle, { y: 0, opacity: 0.25 + Math.random() * 0.3 }) },
              })
            }
          }

          // ── Scramble "Daisy" ───────────────────────────────────────────
          const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
          const SCRAMBLE_START_MS = 350  // after logo starts
          const CHAR_STAGGER_MS  = 90
          const TICK_MS          = 45
          const TICK_COUNT       = 8

          if (nameRef.current) {
            const split = new SplitText(nameRef.current, { type: 'chars' })
            splitInstance = split
            const chars = split.chars as HTMLElement[]

            // Hide all chars initially; tagline & CTA also hidden
            chars.forEach(el => gsap.set(el, { opacity: 0 }))
            gsap.set([taglineRef.current, ctaRef.current], { opacity: 0 })

            let scrambleEndMs = 0

            chars.forEach((el, i) => {
              const target = el.textContent ?? ''
              const charStartMs = SCRAMBLE_START_MS + i * CHAR_STAGGER_MS
              const charEndMs   = charStartMs + TICK_COUNT * TICK_MS + 300 // +300 for color settle
              scrambleEndMs = Math.max(scrambleEndMs, charEndMs)

              const t = setTimeout(() => {
                gsap.set(el, { opacity: 1, color: '#5865F2' })
                let ticks = 0
                const iv = setInterval(() => {
                  el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                  ticks++
                  if (ticks >= TICK_COUNT) {
                    clearInterval(iv)
                    el.textContent = target
                    gsap.to(el, { color: 'var(--text-heading)', duration: 0.35, ease: 'power2.out' })
                  }
                }, TICK_MS)
                intervals.push(iv)
              }, charStartMs)
              timeouts.push(t)
            })

            // ── Tagline blur-focus (starts only after scramble ends) ──────
            const t2 = setTimeout(() => {
              if (!taglineRef.current) return
              gsap.fromTo(
                taglineRef.current,
                { opacity: 0, filter: 'blur(8px)', y: 6 },
                { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'power2.out' },
              )
              // CTA after tagline resolves
              const t3 = setTimeout(() => {
                gsap.fromTo(
                  ctaRef.current,
                  { opacity: 0, y: 14 },
                  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                )
              }, 900)
              timeouts.push(t3)
            }, scrambleEndMs + 80)
            timeouts.push(t2)
          }
        })
      })
    })

    return () => {
      intervals.forEach(clearInterval)
      timeouts.forEach(clearTimeout)
      splitInstance?.revert()
      gsapCtx?.revert()
    }
  }, [])

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-dvh overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Radial background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(88,101,242,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Particle container (absolutely positioned, z-0) */}
      <div
        ref={particleContainerRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      />

      {/* Logo — static image with orbiting shimmer ring */}
      <div ref={outerRotateRef} className="relative z-10 mb-6" style={{ width: 180, height: 180 }}>
        {/* Blurred glow ring — rotates */}
        <div
          ref={ringGlowRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -16,
            borderRadius: '50%',
            background: 'conic-gradient(rgba(88,101,242,0) 0deg, rgba(88,101,242,0.18) 70deg, rgba(60,75,220,0.32) 120deg, rgba(88,101,242,0) 200deg)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />
        {/* Sharp arc ring — rotates */}
        <div
          ref={ringRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -7,
            borderRadius: '50%',
            background: 'conic-gradient(rgba(88,101,242,0) 0deg, rgba(88,101,242,0.75) 75deg, rgba(60,75,220,1) 115deg, rgba(88,101,242,0) 195deg)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
            pointerEvents: 'none',
          }}
        />
        {/* Static logo */}
        <div ref={innerPulseRef} style={{ width: 180, height: 180, borderRadius: '50%', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
          <Image
            src="/daisybot.logo.png"
            alt="Daisy bot logo"
            fill
            priority
            sizes="180px"
            style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' }}
          />
        </div>
      </div>

      {/* Name */}
      <h1
        ref={nameRef}
        className="font-fraunces z-10"
        style={{
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(52px, 10vw, 88px)',
          color: 'var(--text-heading)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        Daisy
      </h1>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="font-manrope z-10 text-center px-6"
        style={{
          fontWeight: 300,
          fontSize: 16,
          color: 'var(--brand-accent-mid)',
          letterSpacing: '0.03em',
          marginBottom: 32,
          maxWidth: 400,
        }}
      >
        Always listening. Always remembering. Always yours.
      </p>

      {/* CTA */}
      <div ref={ctaRef} className="z-10">
        <a
          href={INVITE_URL}
          className="inline-flex items-center gap-2.5 font-manrope"
          style={{
            borderRadius: 4,
            background: '#5865F2',
            color: '#fff',
            fontWeight: 500,
            fontSize: 15,
            padding: '11px 24px',
            textDecoration: 'none',
            transition: 'background 0.2s, box-shadow 0.2s',
            boxShadow: '0 2px 12px rgba(88,101,242,0.35)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = '#4752C4'
            el.style.boxShadow = '0 4px 20px rgba(88,101,242,0.5)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = '#5865F2'
            el.style.boxShadow = '0 2px 12px rgba(88,101,242,0.35)'
          }}
        >
          {/* Discord logo */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Add Daisy to your server
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 flex flex-col items-center gap-2 font-syne"
        style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}
        aria-hidden="true"
      >
        Scroll
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
