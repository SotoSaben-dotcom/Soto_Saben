import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FadeUp, MaskedLines } from "../components/Reveal";
import { waLink, WA_DISPLAY, MENU, LAUK, EXTRA_DRINKS } from "../lib/site";

const toNum = (p) => parseInt(p.replace(/[^0-9]/g, ""), 10);

const GROUPS = [
  { label: "Soto — per porsi", options: MENU[0].items.map((i) => ({ value: i.name, harga: toNum(i.price) })) },
  {
    label: "Minuman",
    options: [
      ...MENU[2].items.map((i) => ({ value: i.name, harga: toNum(i.price) })),
      ...EXTRA_DRINKS.map((d) => ({ value: d, harga: null })),
    ],
  },
  { label: "Lauk & Jajanan", options: LAUK.items.map((i) => ({ value: i.name, harga: toNum(i.price) })) },
];

const inputCls =
  "w-full bg-transparent border-0 border-b border-line rounded-none px-0 py-3 text-sm sm:text-base placeholder:text-kopi/50 focus:outline-none focus:border-sambal focus:ring-0 transition-colors duration-300";

const formatRp = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function Pesan() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    tanggal: "",
    porsi: 10,
    jenis: "Soto Ayam Kampung",
    lokasi: "Cabang Berbah — Warung Soto Saben",
    catatan: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const hargaAktif = useMemo(() => {
    for (const g of GROUPS) {
      const found = g.options.find((o) => o.value === form.jenis);
      if (found) return found.harga;
    }
    return null;
  }, [form.jenis]);

  const estimasi = useMemo(() => {
    const porsi = parseInt(form.porsi, 10);
    return hargaAktif !== null && porsi > 0 ? hargaAktif * porsi : null;
  }, [hargaAktif, form.porsi]);

  const today = new Date().toISOString().split("T")[0];

  const submit = (e) => {
    e.preventDefault();
    const porsi = parseInt(form.porsi, 10);
    if (!form.nama.trim() || !form.tanggal || !form.lokasi.trim()) {
      toast.error("Mohon lengkapi nama, tanggal, dan lokasi acara.");
      return;
    }
    if (!Number.isFinite(porsi) || porsi < 10) {
      toast.error("Reservasi tempat minimal 10 porsi.");
      return;
    }
    const pesan = [
      `Halo Warung Soto Saben, saya ${form.nama.trim()}.`,
      "Saya ingin reservasi tempat di Cabang Berbah:",
      `- Tanggal acara: ${form.tanggal}`,
      `- Jumlah: ${porsi} porsi`,
      `- Menu: ${form.jenis}`,
      `- Lokasi acara: ${form.lokasi.trim()}`,
      form.telepon.trim() ? `- No. HP saya: ${form.telepon.trim()}` : null,
      form.catatan.trim() ? `- Catatan: ${form.catatan.trim()}` : null,
      "Mohon info ketersediaan, harga, dan sound system bila diperlukan. Terima kasih.",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(pesan), "_blank", "noopener");
    toast.success("Membuka WhatsApp — pesan Anda sudah tersusun rapi.");
  };

  return (
    <div data-testid="pesan-page">
      <Navbar />
      <main className="pt-28 sm:pt-36 pb-20 sm:pb-28 min-h-screen">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-emas">Pesan untuk Reservasi</p>
          </FadeUp>
          <MaskedLines
            className="mt-4 font-serif font-medium tracking-tight leading-[1] text-5xl sm:text-7xl"
            lines={["Biar Kami yang", <em key="b" className="text-sambal">Sibuk di Dapur.</em>]}
            delay={0.1}
          />
          <FadeUp delay={0.25}>
            <p className="mt-6 max-w-lg text-sm sm:text-base text-kopi leading-relaxed">
              Reservasi tempat untuk arisan, rapat, reuni, dan acara keluarga
              lainnya — khusus di Cabang Berbah: joglo teduh di tepi sawah,
              minimal 10 porsi. Butuh sound system untuk mendukung acara?
              Tinggal bilang, kami sediakan. Isi formulir — pesan WhatsApp
              tersusun otomatis, Anda tinggal kirim.
            </p>
          </FadeUp>

          <div className="mt-14 grid lg:grid-cols-12 gap-12">
            <FadeUp delay={0.15} className="lg:col-span-7">
              <form onSubmit={submit} data-testid="pesan-form" className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                <div>
                  <label htmlFor="nama" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Nama Anda *</label>
                  <input id="nama" data-testid="pesan-input-nama" className={inputCls} placeholder="cth. Bu Harti" value={form.nama} onChange={set("nama")} required />
                </div>
                <div>
                  <label htmlFor="telepon" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">No. HP (opsional)</label>
                  <input id="telepon" data-testid="pesan-input-telepon" className={inputCls} placeholder="cth. 0812 3456 7890" value={form.telepon} onChange={set("telepon")} />
                </div>
                <div>
                  <label htmlFor="tanggal" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Tanggal Acara *</label>
                  <input id="tanggal" type="date" min={today} data-testid="pesan-input-tanggal" className={inputCls} value={form.tanggal} onChange={set("tanggal")} required />
                </div>
                <div>
                  <label htmlFor="porsi" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Jumlah Porsi (min. 10) *</label>
                  <input id="porsi" type="number" min={10} step={1} data-testid="pesan-input-porsi" className={inputCls} value={form.porsi} onChange={set("porsi")} required />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-end justify-between gap-4">
                    <label htmlFor="jenis" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Pilihan Menu *</label>
                    <img src="/images/logo.png" alt="Logo Soto Saben" data-testid="pesan-menu-logo" className="h-9 w-auto" />
                  </div>
                  <select id="jenis" data-testid="pesan-select-jenis" className={`${inputCls} cursor-pointer`} value={form.jenis} onChange={set("jenis")}>
                    {GROUPS.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.value}{o.harga !== null ? ` — ${formatRp(o.harga)}` : ""}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="lokasi" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Lokasi Acara *</label>
                  <input id="lokasi" data-testid="pesan-input-lokasi" className={`${inputCls} text-kopi cursor-not-allowed`} value={form.lokasi} readOnly aria-readonly="true" />
                  <p className="mt-1.5 text-xs text-kopi/70 italic">Otomatis — reservasi tempat hanya di Cabang Berbah.</p>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="catatan" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Catatan (opsional)</label>
                  <textarea id="catatan" rows={3} data-testid="pesan-input-catatan" className={`${inputCls} resize-none`} placeholder="cth. Arisan 25 orang, perlu sound system, acara mulai pukul 10.00" value={form.catatan} onChange={set("catatan")} />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    data-testid="pesan-submit-button"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-sambal text-bone text-sm font-semibold hover:bg-ink transition-colors duration-300"
                  >
                    Kirim Reservasi via WhatsApp
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            </FadeUp>

            <FadeUp delay={0.3} className="lg:col-span-4 lg:col-start-9">
              <aside className="border border-line p-8 sticky top-28" data-testid="pesan-summary">
                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Ringkasan</p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-kopi">Menu</dt>
                    <dd className="font-medium text-right" data-testid="summary-jenis">{form.jenis}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-kopi">Porsi</dt>
                    <dd className="font-medium" data-testid="summary-porsi">{form.porsi || 0}</dd>
                  </div>
                  <div className="flex justify-between gap-4 pt-4 border-t border-line items-baseline">
                    <dt className="text-kopi">Estimasi kasar</dt>
                    <dd className="font-serif text-2xl font-semibold" data-testid="summary-estimasi">
                      {estimasi !== null ? formatRp(estimasi) : "—"}
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs text-kopi leading-relaxed">
                  Estimasi mengikuti harga satuan menu. Harga final dan ketersediaan
                  sound system dikonfirmasi admin lewat WhatsApp {WA_DISPLAY}.
                </p>
              </aside>
            </FadeUp>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
