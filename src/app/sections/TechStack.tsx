'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'

const TECH = [
  { label: 'LangChain', color: 'var(--brand-accent-mid)' },
  { label: 'LangGraph', color: 'var(--brand-accent-mid)' },
  { label: 'Discord.js', color: 'var(--blurple)' },
  { label: 'Supabase', color: 'var(--supabase)' },
  { label: 'Groq', color: 'var(--brand-accent-mid)' },
  { label: 'Llama', color: 'var(--brand-accent-mid)' },
  { label: 'TypeScript', color: 'var(--ts-blue)' },
  { label: 'Node.js', color: '#68a063' },
]

export default function TechStack() {
  const pillsRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = pillsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="font-syne mb-10"
          style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
        >
          Built With
        </p>
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-3">
          {TECH.map((t, i) => (
            <Badge
              key={t.label}
              variant="outline"
              className="font-mono"
              style={{
                borderRadius: 9999,
                border: '1px solid var(--brand-border)',
                background: 'var(--surface)',
                color: t.color,
                fontFamily: 'var(--font-space-mono-var)',
                fontSize: 11,
                padding: '5px 14px',
                letterSpacing: '0.03em',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-8px)',
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
              }}
            >
              {t.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
