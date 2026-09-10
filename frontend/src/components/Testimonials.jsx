import { Quote, Star } from "lucide-react";
import { ChapterHeading, FadeUp, MaskedLines } from "./Reveal";
import { TESTIMONIALS, TAMU_PHOTOS } from "../lib/site";

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
                <div className="flex gap-1 mb-3" data-testid={`testimonial-stars-${i}`} aria-label="Penilaian 5 dari 5 bintang">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={14} className="text-sambal fill-sambal" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="mt-1 text-xs text-kopi">{t.context}</p>
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 sm:mt-20">
        <FadeUp className="flex items-end justify-between gap-6 flex-wrap">
          <h3 className="font-serif font-medium tracking-tight text-3xl sm:text-4xl leading-tight">
            Tamu Mancanegara <em className="text-sambal">pun Mampir.</em>
          </h3>
          <p className="max-w-xs text-sm text-kopi leading-relaxed">
            Turis asal Australia singgah ke warung dan jatuh cinta pada semangkuk
            soto — dan mendoan hangatnya.
          </p>
        </FadeUp>
        <div className="mt-8 grid sm:grid-cols-3 gap-3 sm:gap-6" data-testid="tamu-photos">
          {TAMU_PHOTOS.map((p, i) => (
            <FadeUp key={p.src} delay={0.1 + i * 0.08}>
              <div className="overflow-hidden border border-line">
                <img
                  src={p.src}
                  alt={p.caption}
                  data-testid={`tamu-photo-${i}`}
                  className="w-full aspect-[7/4] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-sm text-kopi">{p.caption}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  </section>
);
