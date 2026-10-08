import { Reveal } from "@/components/reveal"

interface SectionHeadingProps {
  id: string
  title: string
  description?: string
}

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
      <h2 id={id} className="text-3xl text-balance md:text-4xl">
        {title}
      </h2>
      {description && <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p>}
    </Reveal>
  )
}
