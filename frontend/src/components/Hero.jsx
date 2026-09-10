import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MaskedLines } from "./Reveal";
import { WA_DEFAULT } from "../lib/site";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative overflow-hidden pt-28 sm:pt-36 pb-10 sm:pb-16">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 right-0 font-serif italic text-[26vw] leading-none text-ink/[0.04]"
      >
        Saben
      </span>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
        <motion.div style={{ opacity: fade }} className="lg:col-span-7 relative z-10">
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
            className="font-serif font-medium tracking-tight leading-[0.95] text-[15.5vw] sm:text-[12vw] lg:text-[7.6rem]"
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
            Resep soto turun-temurun dari dapur keluarga kami — dimasak jujur
            setiap pagi, disajikan hangat untuk Anda.
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
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-ink text-sm font-semibold hover:bg-ink hover:text-bone transition-colors duration-300"
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
            className="mt-10 text-xs tracking-widest uppercase text-kopi/70"
            data-testid="hero-meta"
          >
            Setiap hari sejak 06.00 · Sleman & Bantul, Yogyakarta
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative overflow-hidden border border-line aspect-[4/5] max-h-[70vh] w-full" data-testid="hero-image-frame">
            <motion.img
              src="/images/warung-asli.jpg"
              alt="Tampak depan Warung Soto Saben"
              style={{ y: imgY }}
              className="absolute inset-0 h-[115%] w-full object-cover"
              loading="eager"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="absolute -bottom-6 -left-4 sm:-left-8 bg-bone border border-line px-5 py-4 max-w-[240px]"
            data-testid="hero-caption-card"
          >
            <p className="font-serif italic text-lg leading-snug">"Dimasak jujur setiap pagi."</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Dapur Soto Saben</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
