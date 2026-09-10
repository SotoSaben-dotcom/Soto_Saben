import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";

const LINKS = [
  { label: "Cerita", to: "/#cerita", id: "cerita" },
  { label: "Menu", to: "/#menu", id: "menu" },
  { label: "Cabang", to: "/#cabang", id: "cabang" },
  { label: "Acara", to: "/#acara", id: "acara" },
  { label: "Galeri", to: "/galeri", id: "galeri" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [pesanOpen, setPesanOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setPesanOpen(false);
  }, [location]);

  useEffect(() => {
    if (!pesanOpen) return;
    const close = (e) => {
      if (!e.target.closest?.("[data-testid='nav-pesan-wrap']")) setPesanOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [pesanOpen]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 border-b backdrop-blur-xl bg-bone/80 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
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
          <div className="relative" data-testid="nav-pesan-wrap">
            <button
              data-testid="nav-cta-pesan"
              onClick={() => setPesanOpen((v) => !v)}
              aria-expanded={pesanOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 border border-ink bg-ink text-bone hover:bg-sambal hover:border-sambal transition-colors duration-300"
            >
              Pesan Sekarang
              <ChevronDown size={15} className={`transition-transform duration-300 ${pesanOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {pesanOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full mt-2 w-80 border border-line bg-bone shadow-sm z-50"
                  role="menu"
                  data-testid="nav-pesan-menu"
                >
                  <Link
                    to="/pesan?mode=reservasi"
                    role="menuitem"
                    data-testid="nav-pesan-reservasi"
                    className="block px-5 py-4 border-b border-line hover:bg-ink/[0.04] transition-colors duration-300"
                  >
                    <span className="block text-sm font-semibold">Reservasi Tempat</span>
                    <span className="mt-0.5 block text-xs text-kopi leading-relaxed">Khusus Cabang Berbah — arisan, rapat, reuni, min. 10 porsi</span>
                  </Link>
                  <Link
                    to="/#menu"
                    role="menuitem"
                    data-testid="nav-pesan-di-tempat"
                    className="block px-5 py-4 hover:bg-ink/[0.04] transition-colors duration-300"
                  >
                    <span className="block text-sm font-semibold">Pesanan di Tempat</span>
                    <span className="mt-0.5 block text-xs text-kopi leading-relaxed">Pilih menu favorit, pesan langsung lewat WhatsApp</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                to="/pesan?mode=reservasi"
                data-testid="nav-mobile-cta-reservasi"
                className="mt-2 text-center text-sm font-semibold px-5 py-3 bg-sambal text-bone"
              >
                Reservasi Tempat (Cab. Berbah)
              </Link>
              <Link
                to="/#menu"
                data-testid="nav-mobile-cta-menu"
                className="text-center text-sm font-semibold px-5 py-3 border border-ink"
              >
                Pesanan di Tempat
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
