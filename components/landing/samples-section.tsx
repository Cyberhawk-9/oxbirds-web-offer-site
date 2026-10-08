import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/landing/section-heading"
import { partner } from "@/lib/partner"

export function SamplesSection() {
  const samples = partner.samples.filter((sample) => sample.title)
  if (samples.length === 0) return null

  return (
    <section aria-labelledby="samples-heading" className="w-full px-4 py-20 md:px-6 md:py-28">
      <div className="container max-w-6xl mx-auto flex flex-col gap-12">
        <SectionHeading id="samples-heading" title="Sample sites" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((sample, index) => (
            <Reveal as="li" key={sample.title} index={index} className="card-surface flex flex-col">
              {sample.image && (
                <Image
                  src={sample.image || "/placeholder.svg"}
                  alt={sample.title}
                  width={800}
                  height={500}
                  className="aspect-[8/5] w-full object-cover"
                />
              )}
              <div className="flex flex-col gap-2 p-6">
                <h3 className="text-lg text-foreground">
                  {sample.url ? (
                    <a href={sample.url} target="_blank" rel="noopener noreferrer" className="hover:text-glow">
                      {sample.title}
                    </a>
                  ) : (
                    sample.title
                  )}
                </h3>
                {sample.description && <p className="text-muted-foreground">{sample.description}</p>}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
