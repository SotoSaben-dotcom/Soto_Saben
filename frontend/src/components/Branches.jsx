import { Link } from "react-router-dom";
import {
  Users, Trees, Baby, Music, MapPin, Soup, Store, Armchair,
  Car, Warehouse, Wind, Sun, Clock, ArrowUpRight,
} from "lucide-react";
import { ChapterHeading, FadeUp, MaskedLines } from "./Reveal";
import { BRANCHES } from "../lib/site";

const ICONS = { Users, Trees, Baby, Music, MapPin, Soup, Store, Armchair, Car, Warehouse, Wind, Sun };

const BranchBlock = ({ branch, flip }) => (
  <article data-testid={`branch-${branch.id}`} className="py-16 sm:py-24 border-t border-line first:border-t-0 first:pt-0">
    <ChapterHeading number={branch.number} title={branch.label} />

    <div className={`mt-10 sm:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 ${flip ? "" : ""}`}>
      <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <MaskedLines
          inView
          as="h3"
          className="font-serif font-medium tracking-tight leading-[1.08] text-3xl sm:text-[2.6rem]"
          lines={[branch.title]}
        />
        <FadeUp delay={0.15}>
          <p className="mt-6 text-sm sm:text-base text-kopi leading-relaxed">{branch.description}</p>
        </FadeUp>

        <ul className="mt-8 space-y-6" data-testid={`branch-${branch.id}-features`}>
          {branch.features.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <FadeUp key={f.title} delay={0.1 + i * 0.07}>
                <li className="flex gap-4">
                  <span className="mt-1 shrink-0 w-9 h-9 border border-line flex items-center justify-center text-sambal">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm sm:text-base font-semibold">{f.title}</p>
                    <p className="mt-1 text-sm text-kopi leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              </FadeUp>
            );
          })}
        </ul>

        <FadeUp delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
          {branch.reservasi && (
            <Link
              to="/pesan?mode=reservasi"
              data-testid={`branch-${branch.id}-reservasi`}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-ink text-bone text-sm font-semibold hover:bg-sambal transition-colors duration-300"
            >
              Reservasi Tempat
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
          <a
            href={branch.maps}
            target="_blank"
            rel="noreferrer"
            data-testid={`branch-${branch.id}-maps`}
            className="group inline-flex items-center gap-2 px-6 py-3 border border-ink text-sm font-semibold hover:bg-ink hover:text-bone transition-colors duration-300"
          >
            Buka di Google Maps
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </FadeUp>

        <FadeUp delay={0.25} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-kopi">
          <span className="inline-flex items-center gap-1.5"><Clock size={13} aria-hidden="true" /> {branch.hours}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" /> {branch.address}</span>
          {branch.reservasi && <span className="text-sambal font-semibold">Reservasi minimal 10 orang</span>}
        </FadeUp>
      </div>

      <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {branch.photos.map((p, i) => (
            <FadeUp
              key={p.src}
              delay={0.1 + i * 0.08}
              className={`overflow-hidden border border-line ${i % 2 === 1 ? "mt-6 sm:mt-10" : ""}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3}>
          <p className="mt-4 text-[0.65rem] tracking-[0.25em] uppercase text-kopi/70">
            Foto asli Soto Saben {branch.label}
          </p>
        </FadeUp>
      </div>
    </div>
  </article>
);

export const Branches = () => (
  <section id="cabang" data-testid="branches-section" className="py-20 sm:py-32 border-t border-line scroll-mt-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {BRANCHES.map((b, i) => (
        <BranchBlock key={b.id} branch={b} flip={i % 2 === 1} />
      ))}
    </div>
  </section>
);
