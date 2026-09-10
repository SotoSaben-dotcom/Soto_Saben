import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FadeUp, MaskedLines } from "../components/Reveal";
import { GALLERY } from "../lib/site";

const FILTERS = ["Semua", "Acara", "Cabang", "Hidangan"];

export default function Galeri() {
  const [filter, setFilter] = useState("Semua");
  const [active, setActive] = useState(null);

  const photos = useMemo(
    () => (filter === "Semua" ? GALLERY : GALLERY.filter((p) => p.kategori === filter)),
    [filter]
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir) => setActive((cur) => (cur === null ? null : (cur + dir + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  return (
    <div data-testid="galeri-page">
      <Navbar />
      <main className="pt-28 sm:pt-36 pb-20 sm:pb-28 min-h-screen">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-emas">Galeri</p>
          </FadeUp>
          <MaskedLines
            className="mt-4 font-serif font-medium tracking-tight leading-[1] text-5xl sm:text-7xl"
            lines={["Jejak Rasa,", <em key="j" className="text-sambal">Jejak Acara.</em>]}
            delay={0.1}
          />
          <FadeUp delay={0.25}>
            <p className="mt-6 max-w-md text-sm sm:text-base text-kopi leading-relaxed">
              Foto asli dari dapur, warung, dan ratusan acara yang pernah kami
              temani — tanpa filter, tanpa pemanis.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="mt-10 flex flex-wrap gap-2" data-testid="gallery-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`gallery-filter-${f.toLowerCase()}`}
                onClick={() => { setFilter(f); setActive(null); }}
                className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase border transition-colors duration-300 ${
                  filter === f
                    ? "bg-ink text-bone border-ink"
                    : "border-line text-kopi hover:border-ink hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </FadeUp>

          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4" data-testid="gallery-grid">
            <AnimatePresence mode="popLayout">
              {photos.map((p, i) => (
                <motion.button
                  layout
                  key={p.src}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActive(i)}
                  data-testid={`gallery-item-${i}`}
                  className="group mb-4 block w-full break-inside-avoid text-left"
                >
                  <div className="overflow-hidden border border-line">
                    <img
                      src={p.src}
                      alt={p.caption}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 mb-1 text-xs text-kopi group-hover:text-sambal transition-colors duration-300">
                    {p.caption}
                  </p>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {active !== null && photos[active] && (
          <motion.div
            data-testid="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={photos[active].caption}
          >
            <button
              data-testid="lightbox-close"
              onClick={close}
              aria-label="Tutup galeri"
              className="absolute top-5 right-5 p-3 border border-bone/30 text-bone hover:bg-sambal hover:border-sambal transition-colors duration-300"
            >
              <X size={18} />
            </button>
            <button
              data-testid="lightbox-prev"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 sm:left-8 p-3 border border-bone/30 text-bone hover:bg-sambal hover:border-sambal transition-colors duration-300"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              data-testid="lightbox-next"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Foto berikutnya"
              className="absolute right-3 sm:right-8 p-3 border border-bone/30 text-bone hover:bg-sambal hover:border-sambal transition-colors duration-300"
            >
              <ArrowRight size={18} />
            </button>
            <motion.figure
              key={photos[active].src}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[active].src}
                alt={photos[active].caption}
                className="w-full max-h-[75vh] object-contain border border-bone/20"
                data-testid="lightbox-image"
              />
              <figcaption className="mt-4 flex items-center justify-between text-bone/80 text-sm">
                <span data-testid="lightbox-caption">{photos[active].caption}</span>
                <span className="text-xs text-bone/50">{active + 1} / {photos.length}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
