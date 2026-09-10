import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, MapPin, MessageCircle } from "lucide-react";
import { FadeUp } from "./Reveal";
import { BRANCHES, WA_DEFAULT, WA_DISPLAY } from "../lib/site";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-line bg-ink text-bone">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 sm:pt-28 pb-10">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <FadeUp>
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-bone/50">Warung Soto Saben</p>
            <p className="mt-6 font-serif font-medium tracking-tight leading-[1.02] text-5xl sm:text-7xl">
              Sampai jumpa<br />di <em className="text-sambal">warung.</em>
            </p>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-cta-whatsapp"
              className="group mt-10 inline-flex items-center gap-3 px-8 py-4 bg-sambal text-bone text-sm font-semibold hover:bg-bone hover:text-ink transition-colors duration-300"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Pesan via WhatsApp — {WA_DISPLAY}
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeUp>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <FadeUp delay={0.15}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-bone/50 mb-6">Tiga Cabang Kami</p>
            <ul className="divide-y divide-bone/10 border-y border-bone/10" data-testid="footer-branches">
              {BRANCHES.map((b) => (
                <li key={b.id} className="py-5">
                  <a
                    href={b.maps}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`footer-branch-${b.id}`}
                    className="group flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-serif text-xl font-semibold group-hover:text-sambal transition-colors duration-300">
                        {b.label}
                      </p>
                      <p className="mt-1.5 text-xs text-bone/60 flex items-center gap-1.5">
                        <MapPin size={12} aria-hidden="true" /> {b.address}
                      </p>
                      <p className="mt-1 text-xs text-bone/60 flex items-center gap-1.5">
                        <Clock size={12} aria-hidden="true" /> {b.hours}
                      </p>
                    </div>
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-bone/40 group-hover:text-sambal transition-colors duration-300" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Tautan footer">
              <Link to="/#cerita" data-testid="footer-link-cerita" className="text-bone/70 hover:text-sambal transition-colors duration-300">Cerita</Link>
              <Link to="/#menu" data-testid="footer-link-menu" className="text-bone/70 hover:text-sambal transition-colors duration-300">Menu</Link>
              <Link to="/#cabang" data-testid="footer-link-cabang" className="text-bone/70 hover:text-sambal transition-colors duration-300">Cabang</Link>
              <Link to="/galeri" data-testid="footer-link-galeri" className="text-bone/70 hover:text-sambal transition-colors duration-300">Galeri</Link>
              <Link to="/pesan" data-testid="footer-link-pesan" className="text-bone/70 hover:text-sambal transition-colors duration-300">Pesan</Link>
            </nav>
          </FadeUp>
        </div>
      </div>

      <div className="mt-16 sm:mt-24 pt-8 border-t border-bone/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-bone/50">
        <p data-testid="footer-copyright">© {new Date().getFullYear()} Warung Soto Saben. Resep turun-temurun.</p>
        <p>Dibuat dengan hangat di Yogyakarta</p>
      </div>
    </div>
  </footer>
);
