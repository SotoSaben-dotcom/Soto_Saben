import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FadeUp, MaskedLines } from "../components/Reveal";
import { waLink, WA_DISPLAY, MENU, LAUK, EXTRA_DRINKS } from "../lib/site";

const toNum = (p) => parseInt(p.replace(/[^0-9]/g, ""), 10);

const SOTO_NAMES = ["Soto Ayam Kampung", "Soto Daging Sapi"];
const ACARA_HIDE = ["Paha Bawah Ayam Kampung", "Paha Atas Ayam Kampung", "Kepala Ayam Kampung", "Ati Ampela Ayam Kampung"];
const MINUMAN_NAMES = ["Teh / Jeruk Nipis", "Milo", "Good Day", "Kopi Susu", "Lemon Tea", "Kopi Hitam", "Coffee Mix", "Susu"];

const GROUPS = [
  { label: "Soto — per porsi", options: MENU[0].items.map((i) => ({ value: i.name, harga: toNum(i.price) })) },
  {
    label: "Minuman",
    options: [
      ...MENU[2].items.map((i) => ({ value: i.name, harga: toNum(i.price) })),
      ...EXTRA_DRINKS.map((d) => ({ value: d.name, harga: toNum(d.price) })),
    ],
  },
  { label: "Lauk & Jajanan", options: LAUK.items.map((i) => ({ value: i.name, harga: toNum(i.price) })) },
];

const inputCls =
  "w-full bg-transparent border-0 border-b border-line rounded-none px-0 py-3 text-sm sm:text-base placeholder:text-kopi/50 focus:outline-none focus:border-sambal focus:ring-0 transition-colors duration-300";

const formatRp = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function Pesan() {
  const [params, setParams] = useSearchParams();
  const isAcara = params.get("mode") === "acara";
  const minTotal = isAcara ? 50 : 10;

  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    tanggal: "",
    menus: { "Soto Ayam Kampung": 0 },
    lokasi: "Cabang Berbah — Warung Soto Saben",
    catatan: "",
    sound: false,
  });

  useEffect(() => {
    setForm((f) => {
      let menus = f.menus;
      if (isAcara) {
        menus = Object.fromEntries(
          Object.entries(menus).filter(([n]) => !ACARA_HIDE.includes(n) && !MINUMAN_NAMES.includes(n))
        );
        const sotos = SOTO_NAMES.filter((s) => s in menus);
        if (sotos.length > 1) sotos.slice(1).forEach((s) => delete menus[s]);
      }
      return {
        ...f,
        menus,
        lokasi: isAcara
          ? f.lokasi.startsWith("Cabang Berbah")
            ? ""
            : f.lokasi
          : "Cabang Berbah — Warung Soto Saben",
      };
    });
  }, [isAcara]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const toggleMenu = (v) =>
    setForm((f) => {
      const menus = { ...f.menus };
      if (v in menus) delete menus[v];
      else {
        if (isAcara && SOTO_NAMES.includes(v)) SOTO_NAMES.forEach((s) => delete menus[s]);
        menus[v] = 0;
      }
      return { ...f, menus };
    });

  const setQty = (v, qty) =>
    setForm((f) => ({
      ...f,
      menus: { ...f.menus, [v]: Math.max(0, parseInt(qty, 10) || 0) },
    }));

  const priceMap = useMemo(() => {
    const m = {};
    for (const g of GROUPS) for (const o of g.options) m[o.value] = o.harga;
    return m;
  }, []);

  const groupsTampil = useMemo(() => {
    if (!isAcara) return GROUPS;
    return GROUPS.filter((g) => g.label !== "Minuman").map((g) => ({
      ...g,
      options: g.options.filter((o) => !ACARA_HIDE.includes(o.value)),
    }));
  }, [isAcara]);

  const totalQty = Object.values(form.menus).reduce((a, b) => a + b, 0);

  const estimasi = useMemo(() => {
    let total = 0;
    let ada = false;
    for (const [name, qty] of Object.entries(form.menus)) {
      const h = priceMap[name];
      if (h != null) {
        total += h * qty;
        ada = true;
      }
    }
    return ada ? total : null;
  }, [form.menus, priceMap]);

  const today = new Date().toISOString().split("T")[0];

  const submit = (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.tanggal || (isAcara && !form.lokasi.trim())) {
      toast.error(
        isAcara
          ? "Mohon lengkapi nama, tanggal, dan lokasi acara."
          : "Mohon lengkapi nama dan tanggal acara."
      );
      return;
    }
    if (Object.keys(form.menus).length === 0) {
      toast.error("Pilih minimal satu menu.");
      return;
    }
    if (totalQty < minTotal) {
      toast.error(
        isAcara
          ? "Pesanan acara minimal 50 porsi secara keseluruhan."
          : "Reservasi minimal 10 porsi secara keseluruhan."
      );
      return;
    }
    const menuLine = Object.entries(form.menus).map(([n, q]) => `${n} x${q}`).join(", ");
    const pesan = (isAcara
      ? [
          `Halo Warung Soto Saben, saya ${form.nama.trim()}.`,
          "Saya ingin memesan soto untuk acara:",
          `- Tanggal acara: ${form.tanggal}`,
          `- Menu: ${menuLine}`,
          `- Total: ${totalQty} porsi/pcs`,
          `- Lokasi acara: ${form.lokasi.trim()}`,
          form.telepon.trim() ? `- No. HP saya: ${form.telepon.trim()}` : null,
          form.catatan.trim() ? `- Catatan: ${form.catatan.trim()}` : null,
          estimasi !== null ? `- Estimasi menu: ${formatRp(estimasi)} (belum termasuk antar & racik di lokasi)` : null,
          "Mohon info ketersediaan, harga, serta layanan antar dan racik di lokasi. Terima kasih.",
        ]
      : [
          `Halo Warung Soto Saben, saya ${form.nama.trim()}.`,
          "Saya ingin reservasi tempat di Cabang Berbah:",
          `- Tanggal acara: ${form.tanggal}`,
          `- Menu: ${menuLine}`,
          `- Total: ${totalQty} porsi/pcs`,
          `- Lokasi acara: ${form.lokasi.trim()}`,
          form.telepon.trim() ? `- No. HP saya: ${form.telepon.trim()}` : null,
          form.catatan.trim() ? `- Catatan: ${form.catatan.trim()}` : null,
          estimasi !== null ? `- Estimasi konsumsi di tempat: ${formatRp(estimasi)}` : null,
          form.sound ? "- Sound system: perlu, tolong disiapkan" : null,
          "Mohon info ketersediaan, harga, dan sound system bila diperlukan. Terima kasih.",
        ]
    )
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
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-emas" data-testid="pesan-eyebrow">
              {isAcara ? "Pesan untuk Acara" : "Pesan untuk Reservasi"}
            </p>
          </FadeUp>
          <MaskedLines
            className="mt-4 font-serif font-medium tracking-tight leading-[1] text-5xl sm:text-7xl"
            lines={isAcara
              ? ["Tidak Usah Repot Cari", "Konsumsi Pas Acara —", <em key="b" className="text-sambal">Panggil Saja Kami.</em>]
              : ["Mau Adain Acara", "di Cab Berbah?", <em key="b" className="text-sambal">Bisa Banget Dong — Kita Siapkan.</em>]}
            delay={0.1}
          />
          <FadeUp delay={0.25}>
            <p className="mt-6 max-w-lg text-sm sm:text-base text-kopi leading-relaxed" data-testid="pesan-intro">
              {isAcara
                ? "Hajatan, acara kantor, tirakatan, sampai makan siang gedung — minimal 50 porsi, kami siapkan, antar, dan bisa diracik langsung di lokasi acara Anda. Isi formulir — pesan WhatsApp tersusun otomatis, Anda tinggal kirim."
                : "Reservasi tempat untuk arisan, rapat, reuni, dan acara keluarga lainnya — khusus di Cabang Berbah: joglo teduh di tepi sawah, minimal 10 porsi. Butuh sound system untuk mendukung acara? Tinggal bilang, kami sediakan. Isi formulir — pesan WhatsApp tersusun otomatis, Anda tinggal kirim."}
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="mt-10 inline-flex border border-line" data-testid="pesan-mode-tabs" role="tablist">
            {[
              ["reservasi", "Reservasi Tempat"],
              ["acara", "Pesanan Acara"],
            ].map(([m, label]) => (
              <button
                key={m}
                role="tab"
                aria-selected={(!isAcara && m === "reservasi") || (isAcara && m === "acara")}
                data-testid={`mode-${m}`}
                onClick={() => setParams({ mode: m })}
                className={`px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  (isAcara ? m === "acara" : m === "reservasi")
                    ? "bg-ink text-bone"
                    : "text-kopi hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
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
                <div className="sm:col-span-2">
                  <label htmlFor="tanggal" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Tanggal Acara *</label>
                  <input id="tanggal" type="date" min={today} data-testid="pesan-input-tanggal" className={`${inputCls} sm:max-w-xs`} value={form.tanggal} onChange={set("tanggal")} required />
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">
                    Pilihan Menu * <span className="normal-case tracking-normal text-kopi/70">— pilih menu, lalu isi porsi/pcs di sampingnya</span>
                  </p>
                  <div className="mt-4 space-y-5" data-testid="pesan-menu-picker">
                    {groupsTampil.map((g) => (
                      <div key={g.label}>
                        <p className="text-xs font-semibold text-emas tracking-widest uppercase mb-2.5">{g.label}</p>
                        <div className="flex flex-wrap gap-2">
                          {g.options.map((o) => {
                            const active = o.value in form.menus;
                            return (
                              <span key={o.value} className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  data-testid={`menu-pick-${slug(o.value)}`}
                                  onClick={() => toggleMenu(o.value)}
                                  aria-pressed={active}
                                  className={`px-4 py-2 text-xs sm:text-sm border transition-colors duration-300 ${
                                    active
                                      ? "bg-sambal text-bone border-sambal"
                                      : "border-line text-kopi hover:border-ink hover:text-ink"
                                  }`}
                                >
                                  {o.value}{o.harga !== null ? ` · ${formatRp(o.harga)}` : ""}
                                </button>
                                {active && (
                                  <input
                                    type="number"
                                    min={0}
                                    step={1}
                                    data-testid={`menu-qty-${slug(o.value)}`}
                                    value={form.menus[o.value]}
                                    onChange={(e) => setQty(o.value, e.target.value)}
                                    aria-label={`Jumlah porsi atau pcs untuk ${o.value}`}
                                    title="Isi porsi / pcs"
                                    className="w-20 bg-transparent border border-sambal rounded-none px-2 py-2 text-xs sm:text-sm text-center focus:outline-none focus:ring-0"
                                  />
                                )}
                              </span>
                            );
                          })}
                        </div>
                        {isAcara && g.label.startsWith("Soto") && (
                          <p className="mt-2 text-xs text-sambal italic" data-testid="note-soto-no-mix">
                            Soto tidak bisa di mix — pilih salah satu.
                          </p>
                        )}
                        {isAcara && g.label === "Lauk & Jajanan" && (
                          <p className="mt-2 text-xs text-kopi/80 italic" data-testid="note-gorengan">
                            Aneka gorengan: mendoan, tempe garit, dan bakwan. Aneka sate: ati, usus, dan telur puyuh.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-kopi/70 italic" data-testid="menu-min-note">
                    {isAcara
                      ? "Pesanan acara minimal 50 porsi — kami siapkan, antar, dan racik di lokasi. Aneka sate (ati, usus, telur puyuh) dan gorengan (mendoan, tempe garit, bakwan) — mohon sertakan pilihan Anda di catatan."
                      : "Minimal reservasi 10 porsi secara keseluruhan. Aneka sate (ati, usus, telur puyuh) dan gorengan (mendoan, tempe garit, bakwan) — mohon sertakan pilihan Anda di catatan."}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="lokasi" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Lokasi Acara *</label>
                  {isAcara ? (
                    <input id="lokasi" data-testid="pesan-input-lokasi" className={inputCls} placeholder="cth. Gedung Serbaguna Kalitirto" value={form.lokasi} onChange={set("lokasi")} required />
                  ) : (
                    <>
                      <input id="lokasi" data-testid="pesan-input-lokasi" className={`${inputCls} text-kopi cursor-not-allowed`} value={form.lokasi} readOnly aria-readonly="true" />
                      <p className="mt-1.5 text-xs text-kopi/70 italic">Otomatis — reservasi tempat hanya di Cabang Berbah.</p>
                    </>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="catatan" className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi">Catatan (opsional)</label>
                  <textarea id="catatan" rows={3} data-testid="pesan-input-catatan" className={`${inputCls} resize-none`} placeholder={isAcara ? "cth. Acara mulai pukul 10.00, makan pukul 11.30 — gorengan mendoan & bakwan, sate ati & telur puyuh" : "cth. Arisan 25 orang, perlu sound system, acara mulai pukul 10.00"} value={form.catatan} onChange={set("catatan")} />
                </div>
                {!isAcara && (
                  <div className="sm:col-span-2">
                    <label className="inline-flex items-center gap-3 cursor-pointer select-none" data-testid="pesan-sound-wrapper">
                      <input
                        type="checkbox"
                        data-testid="pesan-checkbox-sound"
                        checked={form.sound}
                        onChange={(e) => setForm((f) => ({ ...f, sound: e.target.checked }))}
                        className="w-4 h-4 accent-[#C84B31] cursor-pointer"
                      />
                      <span className="text-sm">Butuh sound system untuk mendukung acara</span>
                    </label>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    data-testid="pesan-submit-button"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-sambal text-bone text-sm font-semibold hover:bg-ink transition-colors duration-300"
                  >
                    {isAcara ? "Kirim Pesanan Acara via WhatsApp" : "Kirim Reservasi via WhatsApp"}
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
                    <dt className="text-kopi shrink-0">Menu</dt>
                    <dd className="font-medium text-right" data-testid="summary-menu">
                      {Object.keys(form.menus).length > 0
                        ? Object.entries(form.menus).map(([n, q]) => `${n} x${q}`).join(", ")
                        : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-kopi">Total porsi/pcs</dt>
                    <dd className="font-medium" data-testid="summary-porsi">{totalQty}</dd>
                  </div>
                  <div className="pt-4 border-t border-line">
                    <div className="flex justify-between gap-4 items-baseline">
                      <dt className="text-kopi">{isAcara ? "Estimasi menu" : "Estimasi konsumsi"}</dt>
                      <dd className="font-serif text-2xl font-semibold" data-testid="summary-estimasi">
                        {estimasi !== null ? formatRp(estimasi) : "—"}
                      </dd>
                    </div>
                    <p className="mt-1.5 text-[0.65rem] text-sambal italic" data-testid="summary-estimasi-note">
                      {isAcara
                        ? "Free delivery — gratis antar & racik di lokasi."
                        : "Sudah termasuk makan di tempat — joglo & fasilitas Cabang Berbah."}
                    </p>
                  </div>
                </dl>
                <p className="mt-6 text-xs text-kopi leading-relaxed">
                  {isAcara
                    ? `Estimasi mengikuti harga satuan menu. Free delivery — antar & racik di lokasi gratis. Harga final dikonfirmasi admin lewat WhatsApp ${WA_DISPLAY}.`
                    : `Estimasi mengikuti harga satuan menu. Harga final dan ketersediaan sound system dikonfirmasi admin lewat WhatsApp ${WA_DISPLAY}.`}
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
