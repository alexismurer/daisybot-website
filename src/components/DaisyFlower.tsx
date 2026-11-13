type Props = {
  size?: number
  petals?: number
  petal?: string
  center?: string
  className?: string
  style?: React.CSSProperties
}

export default function DaisyFlower({
  size = 48,
  petals = 12,
  petal = '#ffffff',
  center = '#ffc93c',
  className,
  style,
}: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="24"
          rx="10"
          ry="22"
          fill={petal}
          stroke="rgba(43,33,24,0.22)"
          strokeWidth="1.5"
          transform={`rotate(${(360 / petals) * i} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="15" fill={center} />
      <circle cx="45" cy="45" r="5" fill="#fff" opacity="0.35" />
    </svg>
  )
}
