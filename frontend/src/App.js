import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Galeri from "@/pages/Galeri";
import Pesan from "@/pages/Pesan";
import CabangDetail from "@/pages/CabangDetail";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const lenis = window.__lenis;
    if (hash) {
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 });
        else el.scrollIntoView();
      }, 150);
      return () => clearTimeout(t);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App bg-bone text-ink font-sans">
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/pesan" element={<Pesan />} />
          <Route path="/cabang/:id" element={<CabangDetail />} />
        </Routes>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
