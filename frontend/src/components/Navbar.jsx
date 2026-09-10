import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";

const LINKS = [
  { label: "Cerita", to: "/#cerita", id: "cerita" },
  { label: "Menu", to: "/#menu", id: "menu" },
  { label: "Cabang", to: "/#cabang", id: "cabang" },
  { label: "Acara", to: "/#acara", id: "acara" },
  { label: "Galeri", to: "/galeri", id: "galeri" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 border-b backdrop-blur-xl bg-bone/80 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" aria-label="Warung Soto Saben — kembali ke beranda" className="inline-flex items-center">
          <img src="/images/logo.png" alt="Logo Warung Soto Saben" className="h-12 sm:h-16 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi utama">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              to={l.to}
              data-testid={`nav-link-${l.id}`}
              className="group relative text-sm font-medium text-kopi hover:text-ink transition-colors duration-300"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sambal transition-[width] duration-300 group-hover:w-full" aria-hidden="true" />
            </Link>
          ))}
          <Link
            to="/pesan"
            data-testid="nav-cta-pesan"
            className="text-sm font-semibold px-5 py-2.5 border border-ink bg-ink text-bone hover:bg-sambal hover:border-sambal transition-colors duration-300"
          >
            Pesan Sekarang
          </Link>
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-line bg-bone/95 backdrop-blur-xl"
            aria-label="Navigasi seluler"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {LINKS.map((l) => (
                <Link
                  key={l.id}
                  to={l.to}
                  data-testid={`nav-mobile-link-${l.id}`}
                  className="font-serif text-2xl"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/pesan"
                data-testid="nav-mobile-cta-pesan"
                className="mt-2 text-center text-sm font-semibold px-5 py-3 bg-sambal text-bone"
              >
                Pesan Sekarang
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
