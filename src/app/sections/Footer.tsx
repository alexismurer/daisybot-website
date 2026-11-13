import DaisyFlower from '@/components/DaisyFlower'
import DiscordIcon from '@/components/DiscordIcon'
import { INVITE_URL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="px-6 pb-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-sun px-8 py-14 text-center sm:px-16">
        <DaisyFlower size={120} className="absolute -left-8 -top-8 rotate-12 opacity-90" />
        <DaisyFlower size={90} petal="#ffe3eb" center="#f5a524" className="absolute -bottom-6 right-6 -rotate-12" />
        <h2 className="relative font-fraunces text-[clamp(30px,4.5vw,48px)] font-semibold leading-tight tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"SOFT" 100' }}>
          Ready to brighten your server?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-lg text-ink/75">Invite Daisy and say hi. Your new favourite member is one click away.</p>
        <a
          href={INVITE_URL}
          className="relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-extrabold text-cream shadow-[0_6px_0_rgba(43,33,24,0.35)] transition-transform hover:-translate-y-0.5 active:translate-y-1"
        >
          <DiscordIcon />
          Add to Discord
        </a>
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-ink-soft sm:flex-row">
        <span className="flex items-center gap-2">
          <DaisyFlower size={22} />
          <span className="font-fraunces text-lg italic text-ink">Daisy</span>
        </span>
        <p>Made with ♥ · not affiliated with Discord Inc.</p>
      </div>
    </footer>
  )
}
