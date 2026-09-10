import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MaskedLines } from "./Reveal";
import { WA_DEFAULT } from "../lib/site";

export const Hero = () => {
  const ref = useRef(null);
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
          <Link
            to="/#menu"
            data-testid="hero-cta-menu"
            className="group inline-flex items-center gap-2 px-7 py-3.5 border border-ink bg-bone/60 backdrop-blur-sm text-sm font-semibold hover:bg-ink hover:text-bone transition-colors duration-300"
          >
            Lihat Daftar Menu
            <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </Link>
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-cta-whatsapp"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-sambal text-bone text-sm font-semibold hover:bg-ink transition-colors duration-300"
          >
            Pesan via WhatsApp
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
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
