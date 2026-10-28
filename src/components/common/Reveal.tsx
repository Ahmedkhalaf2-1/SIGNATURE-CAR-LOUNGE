import type { ElementType, ReactNode } from 'react'

interface RevealProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

/** Element that fades in on scroll (see `useReveal`). */
export function Reveal({ as: Tag = 'div', className = '', children }: RevealProps) {
  return <Tag className={`${className} reveal`.trim()}>{children}</Tag>
}
