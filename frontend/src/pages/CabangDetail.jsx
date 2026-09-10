import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowUpRight, Clock, MapPin, MessageCircle,
  Users, Trees, Baby, Music, Soup, Store, Armchair, Car, Warehouse, Wind, Sun,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FadeUp, MaskedLines } from "../components/Reveal";
import { BRANCHES, waLink } from "../lib/site";

const ICONS = { Users, Trees, Baby, Music, MapPin, Soup, Store, Armchair, Car, Warehouse, Wind, Sun };

export default function CabangDetail() {
  const { id } = useParams();
  const branch = BRANCHES.find((b) => b.id === id);
  if (!branch) return <Navigate to="/" replace />;

  return (
    <div data-testid={`cabang-page-${branch.id}`}>
      <Navbar />
      <main className="pt-28 sm:pt-36 pb-20 sm:pb-28 min-h-screen">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <Link
              to="/#cabang"
              data-testid="cabang-back"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-kopi hover:text-sambal transition-colors duration-300"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Semua Cabang
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-10 text-xs font-bold tracking-[0.35em] uppercase text-emas" data-testid="cabang-eyebrow">
              {branch.number} — {branch.label}
            </p>
          </FadeUp>
          <MaskedLines
            className="mt-4 max-w-4xl font-serif font-medium tracking-tight leading-[1.05] text-4xl sm:text-6xl"
            lines={[branch.title]}
            delay={0.15}
          />
          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-2xl text-sm sm:text-base text-kopi leading-relaxed">{branch.description}</p>
          </FadeUp>

          <FadeUp delay={0.35} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-kopi">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-sambal" aria-hidden="true" /> {branch.hours}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-sambal" aria-hidden="true" /> {branch.address}
            </span>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-6 flex flex-wrap gap-3">
            {branch.reservasi && (
              <Link
                to="/pesan?mode=reservasi"
                data-testid={`cabang-${branch.id}-reservasi`}
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
              data-testid={`cabang-${branch.id}-maps`}
              className="group inline-flex items-center gap-2 px-6 py-3 border border-ink text-sm font-semibold hover:bg-ink hover:text-bone transition-colors duration-300"
            >
              Buka di Google Maps
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={waLink(`Halo Warung Soto Saben, saya mau tanya-tanya tentang ${branch.label}.`)}
              target="_blank"
              rel="noreferrer"
              data-testid={`cabang-${branch.id}-whatsapp`}
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-kopi hover:text-sambal transition-colors duration-300"
            >
              <MessageCircle size={15} aria-hidden="true" /> Tanya via WhatsApp
            </a>
          </FadeUp>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4" data-testid="cabang-photos">
            {branch.photos.map((p, i) => (
              <FadeUp
                key={p.src}
                delay={0.08 * i}
                className={`overflow-hidden border border-line ${i % 2 === 1 ? "mt-6 sm:mt-10" : ""}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  data-testid={`cabang-photo-${i}`}
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <p className="mt-4 text-[0.65rem] tracking-[0.25em] uppercase text-kopi/70">
              Foto asli Soto Saben {branch.label}
            </p>
          </FadeUp>

          <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 gap-px bg-line border border-line" data-testid="cabang-features">
            {branch.features.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <FadeUp key={f.title} className="bg-bone">
                  <div className="h-full p-8 sm:p-10">
                    <span className="w-10 h-10 border border-line flex items-center justify-center text-sambal">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <p className="mt-5 text-sm sm:text-base font-semibold">{f.title}</p>
                    <p className="mt-2 text-sm text-kopi leading-relaxed">{f.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp className="mt-16 pt-10 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs tracking-[0.25em] uppercase text-kopi">Cabang Lainnya</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {BRANCHES.filter((b) => b.id !== branch.id).map((b) => (
                <Link
                  key={b.id}
                  to={`/cabang/${b.id}`}
                  data-testid={`cabang-next-${b.id}`}
                  className="font-serif text-xl sm:text-2xl hover:text-sambal transition-colors duration-300"
                >
                  {b.label}
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </div>
  );
}
