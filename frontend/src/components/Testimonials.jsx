import { Quote } from "lucide-react";
import { ChapterHeading, FadeUp, MaskedLines } from "./Reveal";
import { TESTIMONIALS } from "../lib/site";

export const Testimonials = () => (
  <section id="testimoni" data-testid="testimonials-section" className="py-20 sm:py-32 border-t border-line scroll-mt-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <ChapterHeading number="07" title="Kata Mereka" />

      <MaskedLines
        inView
        as="h2"
        className="mt-10 sm:mt-16 max-w-3xl font-serif font-medium tracking-tight leading-[1.05] text-4xl sm:text-5xl"
        lines={["Hangatnya Sampai", <em key="k" className="text-sambal">ke Hati.</em>]}
      />

      <div className="mt-14 sm:mt-20 grid md:grid-cols-3 gap-px bg-line border border-line" data-testid="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <FadeUp key={t.name} delay={i * 0.12} className="bg-bone">
            <figure className="h-full p-8 sm:p-10 flex flex-col" data-testid={`testimonial-${i}`}>
              <Quote size={22} className="text-sambal" aria-hidden="true" />
              <blockquote className="mt-6 font-serif text-xl sm:text-2xl leading-snug flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-line">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="mt-1 text-xs text-kopi">{t.context}</p>
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);
