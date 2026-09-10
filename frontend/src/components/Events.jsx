import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ChapterHeading, FadeUp, MaskedLines } from "./Reveal";
import { EVENT_PHOTOS } from "../lib/site";

export const Events = () => (
  <section id="acara" data-testid="events-section" className="py-20 sm:py-32 border-t border-line scroll-mt-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <ChapterHeading number="06" title="Jejak Acara Kami" />

      <div className="mt-10 sm:mt-16 grid lg:grid-cols-12 gap-8 items-end">
        <MaskedLines
          inView
          as="h2"
          className="lg:col-span-7 font-serif font-medium tracking-tight leading-[1.05] text-4xl sm:text-5xl"
          lines={["Sudah Menemani", <em key="r" className="text-sambal">Ratusan Acara.</em>]}
        />
        <FadeUp delay={0.2} className="lg:col-span-4 lg:col-start-9">
          <p className="text-sm text-kopi leading-relaxed">
            Dari halaman rumah sampai lobi gedung — minimal 50 porsi, kami
            siapkan, antar, dan temani sampai tuntas.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/galeri"
              data-testid="events-cta-gallery"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-ink text-sm font-semibold hover:bg-ink hover:text-bone transition-colors duration-300"
            >
              Lihat Semua
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/pesan?mode=acara"
              data-testid="events-cta-order"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-sambal text-bone text-sm font-semibold hover:bg-ink transition-colors duration-300"
            >
              Pesan untuk Acara
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </FadeUp>
      </div>

      <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" data-testid="events-grid">
        {EVENT_PHOTOS.map((p, i) => (
          <FadeUp key={p.src} delay={0.08 * i} className={i % 3 === 1 ? "lg:mt-12" : ""}>
            <Link to="/galeri" className="group block" data-testid={`event-photo-${i}`}>
              <div className="overflow-hidden border border-line">
                <img
                  src={p.src}
                  alt={p.caption}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-sm font-medium group-hover:text-sambal transition-colors duration-300">
                {p.caption}
              </p>
            </Link>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);
