const TECH = [
  { label: 'LangChain', dot: '#2f9b62' },
  { label: 'LangGraph', dot: '#2f9b62' },
  { label: 'Discord.js', dot: 'var(--blurple)' },
  { label: 'Supabase', dot: 'var(--supabase)' },
  { label: 'Groq', dot: '#f55036' },
  { label: 'Qwen', dot: '#7b62e6' },
  { label: 'TypeScript', dot: 'var(--ts-blue)' },
  { label: 'Node.js', dot: '#68a063' },
]

export default function TechStack() {
  return (
    <section className="bg-cream px-6 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 text-sm font-extrabold uppercase tracking-[0.18em] text-ink-soft/70">Built with</p>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {TECH.map((t) => (
            <li
              key={t.label}
              className="flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.dot }} />
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
