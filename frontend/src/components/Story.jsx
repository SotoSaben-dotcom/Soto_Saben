import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flame, HandMetal, Drumstick, Leaf } from "lucide-react";
import { ChapterHeading, FadeUp, MaskedLines } from "./Reveal";

const POINTS = [
  { icon: Flame, text: "Kaldu ayam kampung & sapi, dimasak perlahan sejak subuh" },
  { icon: HandMetal, text: "Bumbu diulek tradisional setiap pagi" },
  { icon: Drumstick, text: "Daging ayam yang fresh" },
  { icon: Drumstick, text: "Daging sapi yang fresh" },
  { icon: Leaf, text: "Resep dijaga lintas generasi" },
];

export const Story = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="cerita" ref={ref} data-testid="story-section" className="py-20 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHeading number="01" title="Cerita Kami" />

        <div className="mt-10 sm:mt-16 grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <MaskedLines
              inView
              as="h2"
              className="font-serif font-medium tracking-tight leading-[1.05] text-4xl sm:text-5xl"
              lineClassName=""
              lines={["Resep yang Diwariskan,", <em key="b" className="text-sambal">Bukan Sekadar</em>, "Dimasak."]}
            />
            <FadeUp delay={0.2} className="mt-8 space-y-5 text-sm sm:text-base text-kopi leading-relaxed">
              <p>
                Soto Saben lahir dari dapur sederhana keluarga kami. Resepnya tak
                pernah ditulis — diwariskan dari tangan ke tangan, dari generasi
                ke generasi, dijaga persis seperti pertama kali dimasak.
              </p>
              <p>
                Setiap pagi bumbu diulek dengan cara tradisional, bukan digiling.
                Kaldu ayam kampung dipadu kaldu sapi, dimasak perlahan berjam-jam
                hingga kuning keemasan — rasa manis dan asin gurih yang pas.
                Karena tidak ada jalan pintas untuk rasa yang jujur.
              </p>
            </FadeUp>

            <ul className="mt-10 border-t border-line" data-testid="story-points">
              {POINTS.map((p, i) => (
                <FadeUp key={p.text} delay={0.1 + i * 0.08}>
                  <li className="flex items-center gap-4 py-4 border-b border-line">
                    <p.icon size={18} className="text-sambal shrink-0" aria-hidden="true" />
                    <span className="text-sm sm:text-base">{p.text}</span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-4 sm:gap-6 items-start">
            <FadeUp delay={0.15} className="overflow-hidden border border-line mt-10 sm:mt-20">
              <motion.img
                src="/images/soto-1.jpg"
                alt="Semangkuk soto ayam kampung hangat"
                style={{ y: y1 }}
                className="w-full aspect-[3/4] object-cover scale-110 hover:scale-125 transition-transform duration-700"
                loading="lazy"
              />
            </FadeUp>
            <FadeUp delay={0.3} className="overflow-hidden border border-line">
              <img
                src="/images/soto-2.jpg"
                alt="Soto dengan kuah kuning keemasan"
                className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </FadeUp>
            <FadeUp delay={0.4} className="col-span-2">
              <p className="font-serif italic text-lg sm:text-xl text-kopi">
                "Tidak ada jalan pintas untuk rasa yang jujur."
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};
