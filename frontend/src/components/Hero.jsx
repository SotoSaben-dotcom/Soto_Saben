import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MaskedLines } from "./Reveal";

export const Hero = () => {
  const ref = useRef(null);
  const [pesanOpen, setPesanOpen] = useState(false);

  useEffect(() => {
    if (!pesanOpen) return;
    const close = (e) => {
      if (!e.target.closest?.("[data-testid='hero-pesan-wrap']")) setPesanOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [pesanOpen]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative overflow-hidden min-h-screen flex items-end">
      <div className="absolute inset-0" data-testid="hero-image-frame" aria-hidden="true">
        <motion.img
          src="/images/warung-asli.jpg"
          alt=""
          style={{ y: imgY }}
          className="absolute inset-0 h-[112%] w-full object-cover object-[center_38%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bone/90 via-bone/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bone/90 to-transparent" />
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pt-36 pb-24 sm:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-xs font-bold tracking-[0.35em] uppercase text-emas mb-6 sm:mb-10"
          data-testid="hero-eyebrow"
        >
          Warung Soto Saben · Tepi Sawah
        </motion.p>

        <MaskedLines
          data-testid="hero-headline"
          className="max-w-5xl font-serif font-medium tracking-tight leading-[0.95] text-[15.5vw] sm:text-[12vw] lg:text-[7.6rem]"
          lines={["Semangkuk", <em key="w" className="text-sambal">Warisan</em>, "Rasa."]}
          delay={0.25}
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base text-kopi leading-relaxed"
          data-testid="hero-subtext"
        >
          Resep soto turun-temurun dari dapur keluarga kami — dengan rasa yang
          khas, manis dan asin gurih — dimasak jujur setiap pagi, disajikan
          hangat untuk Anda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
        >
          <div className="relative" data-testid="hero-pesan-wrap">
            <button
              data-testid="hero-cta-pesan"
              onClick={() => setPesanOpen((v) => !v)}
              aria-expanded={pesanOpen}
              aria-haspopup="menu"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-ink bg-bone/60 backdrop-blur-sm text-sm font-semibold hover:bg-ink hover:text-bone transition-colors duration-300"
            >
              Pesan Sekarang
              <ChevronDown size={16} className={`transition-transform duration-300 ${pesanOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {pesanOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full mt-2 w-80 border border-line bg-bone shadow-sm z-40"
                  role="menu"
                  data-testid="hero-pesan-menu"
                >
                  <Link
                    to="/pesan?mode=reservasi"
                    role="menuitem"
                    data-testid="hero-pesan-reservasi"
                    className="block px-5 py-4 border-b border-line hover:bg-ink/[0.04] transition-colors duration-300"
                  >
                    <span className="block text-sm font-semibold">Reservasi Tempat</span>
                    <span className="mt-0.5 block text-xs text-kopi leading-relaxed">Khusus Cabang Berbah — arisan, rapat, reuni, min. 10 porsi</span>
                  </Link>
                  <Link
                    to="/pesan?mode=acara"
                    role="menuitem"
                    data-testid="hero-pesan-acara"
                    className="block px-5 py-4 hover:bg-ink/[0.04] transition-colors duration-300"
                  >
                    <span className="block text-sm font-semibold">Pesanan Acara</span>
                    <span className="mt-0.5 block text-xs text-kopi leading-relaxed">Katering hajatan & kantor — min. 50 porsi, antar & racik di lokasi</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-10 text-xs tracking-widest uppercase text-kopi/80"
          data-testid="hero-meta"
        >
          Setiap hari sejak 06.00 · Sleman & Bantul, Yogyakarta
        </motion.p>
      </motion.div>
    </section>
  );
};
