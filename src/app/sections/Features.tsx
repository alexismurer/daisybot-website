'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Brain, Sparkles, ImageIcon, MessageCircleHeart } from 'lucide-react'

const FEATURES = [
  { Icon: Brain, heading: 'Persistent memory', description: 'Daisy remembers facts about you across every session. No repetition, no starting over.', bg: 'bg-sun/45', icon: 'text-sun-deep' },
  { Icon: Sparkles, heading: 'Custom persona', description: 'Set the dynamic that feels right: best friend, coach, romantic partner, or fully custom.', bg: 'bg-pink/55', icon: 'text-[#e0577f]' },
  { Icon: ImageIcon, heading: 'Image generation', description: 'Ask Daisy to paint something and watch your imagination come to life.', bg: 'bg-lilac/60', icon: 'text-[#7b62e6]' },
  { Icon: MessageCircleHeart, heading: 'Natural conversation', description: 'No commands needed. Just @mention and talk.', bg: 'bg-mint/70', icon: 'text-[#2f9b62]' },
]

export default function Features() {
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
          gsap.from('[data-feature]', { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', clearProps: 'opacity,transform,translate,rotate,scale' })
          gsap.from('[data-feature-icon]', { scale: 0, rotation: -30, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'back.out(2.5)', clearProps: 'opacity,transform,translate,rotate,scale' })
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
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-sun-deep">Everything you need</p>
          <h2 className="font-fraunces text-[clamp(32px,5vw,52px)] font-semibold tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"SOFT" 100' }}>
            One companion. Every dynamic.
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map(({ Icon, heading, description, bg, icon }) => (
            <article
              key={heading}
              data-feature
              className={`rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-0.5deg] ${bg}`}
            >
              <span data-feature-icon className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_4px_0_rgba(43,33,24,0.08)]">
                <Icon className={`h-7 w-7 ${icon}`} strokeWidth={2.2} />
              </span>
              <h3 className="font-fraunces text-2xl font-semibold text-ink">{heading}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
