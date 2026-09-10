export const WA_NUMBER = "6285103030305";
export const WA_DISPLAY = "0851 0303 0305";

export const waLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const WA_DEFAULT = waLink("Halo Warung Soto Saben, saya mau pesan soto.");

export const orderLink = (name, category, price) =>
  waLink(`Halo Warung Soto Saben, saya mau pesan ${name} (${category}, ${price}).`);

export const MENU = [
  {
    category: "Soto Campur",
    note: "Nasi dan isian menyatu dalam satu mangkuk kuah hangat.",
    items: [
      { name: "Soto Ayam Kampung", price: "Rp 12.000" },
      { name: "Soto Daging Sapi", price: "Rp 14.000" },
    ],
  },
  {
    category: "Soto Pisah",
    note: "Nasi disajikan terpisah — kuah tetap panas mengepul.",
    items: [
      { name: "Soto Ayam Kampung", price: "Rp 14.000" },
      { name: "Soto Daging Sapi", price: "Rp 16.000" },
    ],
  },
  {
    category: "Minuman",
    note: "Temani semangkuk soto dengan yang hangat atau yang segar.",
    items: [
      { name: "Teh / Jeruk Nipis", price: "Rp 4.000" },
      { name: "Milo", price: "Rp 5.000" },
      { name: "Good Day", price: "Rp 5.000" },
      { name: "Kopi Susu", price: "Rp 5.000" },
    ],
  },
];

export const EXTRA_DRINKS = ["Lemon Tea", "Kopi Hitam", "Coffee Mix", "Susu"];

export const LAUK = {
  category: "Lauk & Jajanan",
  note: "Pendamping wajib semangkuk soto — tinggal tunjuk di etalase.",
  items: [
    { name: "Tahu Bacem", price: "Rp 2.000" },
    { name: "Aneka Gorengan", price: "Rp 1.000" },
    { name: "Aneka Sate", price: "Rp 4.000" },
    { name: "Kerupuk", price: "Rp 1.500" },
    { name: "Paha Bawah Ayam Kampung", price: "Rp 15.000" },
    { name: "Paha Atas Ayam Kampung", price: "Rp 25.000" },
    { name: "Kepala Ayam Kampung", price: "Rp 15.000" },
    { name: "Ati Ampela Ayam Kampung", price: "Rp 10.000" },
  ],
};

export const BRANCHES = [
  {
    id: "berbah",
    number: "03",
    label: "Cabang Berbah",
    title: "Bukan Sekadar Makan, Tapi Berlibur Sejenak.",
    description:
      "Cabang Berbah adalah rumah besar kami. Berdiri di tepi hamparan sawah dengan bangunan joglo yang teduh, tempat ini dirancang untuk berlama-lama: anak bermain, orang tua bercerita, dan semangkuk soto yang mengepul di tengahnya.",
    features: [
      { icon: "Users", title: "Area Luas untuk Rombongan", desc: "Meja-kursi kayu tertata lega di bawah atap joglo — nyaman untuk arisan, reuni, hingga acara keluarga besar." },
      { icon: "Trees", title: "Pemandangan Persawahan", desc: "Duduk di tepi, buka tirai bambu, dan nikmati soto hangat ditemani angin sawah yang sejuk." },
      { icon: "Baby", title: "Taman Bermain Anak", desc: "Ayunan dan komidi putar warna-warni — anak-anak sibuk bermain, orang tua makan dengan tenang." },
      { icon: "Music", title: "Live Music & Karaoke", desc: "Ada organ tunggal siap mengiringi. Boleh request lagu, boleh ikut nyanyi — makan siang jadi hiburan." },
    ],
    hours: "Setiap hari 06.00–15.00 WIB",
    address: "Sumber Kulon, Kalitirto, Berbah, Sleman",
    maps: "https://maps.app.goo.gl/TNg6ByBemajVKpuq5?g_st=ic",
    reservasi: true,
    photos: [
      { src: "/images/berbah/depan.jpg", alt: "Bangunan joglo Soto Saben Cab. Berbah" },
      { src: "/images/berbah/area-makan.jpg", alt: "Area makan luas dengan pemandangan sawah" },
      { src: "/images/berbah/playground.jpg", alt: "Taman bermain anak di Soto Saben Berbah" },
      { src: "/images/berbah/live-music.jpg", alt: "Panggung live music di Soto Saben Berbah" },
    ],
  },
  {
    id: "keputren",
    number: "04",
    label: "Cabang Keputren",
    title: "Warung Hijau di Tepi Jalan, Sarapan Soto Sejak Pukul Enam.",
    description:
      "Di Jl. Jejeran–Pleret, warung berdinding hijau segar ini jadi persinggahan favorit sebelum berangkat kerja. Soto diracik langsung dari gerobak kayu berkaca di depan, lauk hangat berjajar di etalase, dan ruang makan lega menunggu di dalam.",
    features: [
      { icon: "MapPin", title: "Mudah Ditemukan, Parkir Lega", desc: "Tepat di pinggir Jalan Jejeran–Pleret dengan halaman parkir motor yang luas — mampir sebentar pun praktis." },
      { icon: "Soup", title: "Gerobak Kayu Khas Warung", desc: "Kuah dituang langsung dari gerobak kayu berkaca — Anda bisa melihat sendiri soto diracik di depan mata." },
      { icon: "Store", title: "Etalase Lauk Hangat", desc: "Mendoan, kerupuk, dan gorengan pendamping tersaji di etalase — tinggal ambil sesuai selera." },
      { icon: "Armchair", title: "Ruang Makan Lega & Sejuk", desc: "Bangku kayu panjang, ventilasi lebar, dan kipas angin — nyaman untuk sarapan cepat maupun santai bersama keluarga." },
    ],
    hours: "Setiap hari 06.00–14.00 WIB",
    address: "Jl. Jejeran–Pleret, Bantul",
    maps: "https://maps.app.goo.gl/Hj9WztPe73TTEGvR6?g_st=ic",
    reservasi: false,
    photos: [
      { src: "/images/keputren/depan.jpg", alt: "Tampak depan Soto Saben Cab. Keputren di Jl. Jejeran-Pleret" },
      { src: "/images/keputren/gerobak.jpg", alt: "Gerobak kayu berkaca Soto Saben Keputren" },
      { src: "/images/keputren/etalase.jpg", alt: "Etalase lauk dan gorengan" },
      { src: "/images/keputren/area-makan.jpg", alt: "Ruang makan berdinding hijau dengan bangku kayu" },
    ],
  },
  {
    id: "trayeman",
    number: "05",
    label: "Cabang Trayeman",
    title: "Warung Sederhana di Jalan Raya, Ramai Sejak Pagi.",
    description:
      "Di tepi jalan raya Trayeman–Pleret, deretan motor dan mobil yang parkir di depan sudah jadi pemandangan sehari-hari. Di balik atap genteng dan dinding bata ekspos, tersembunyi ruang makan hijau yang teduh — sederhana, bersih, dan selalu hangat.",
    features: [
      { icon: "Car", title: "Persinggahan di Jalan Raya", desc: "Mudah dijangkau dari arah Pleret maupun kota — tinggal parkir di depan, motor maupun mobil sama-sama muat." },
      { icon: "Warehouse", title: "Atap Genteng & Bata Ekspos", desc: "Rangka kayu, genteng tanah liat, dan bata yang dibiarkan tampil jujur — suasana warung Jawa yang apa adanya." },
      { icon: "Wind", title: "Ruang Dalam yang Teduh", desc: "Dinding hijau, bangku kayu panjang, kipas angin dan roster ventilasi — makan siang tetap sejuk meski di luar terik." },
      { icon: "Sun", title: "Teras Depan Semi-Terbuka", desc: "Ada meja santai di teras depan beratap seng untuk yang ingin makan sambil menikmati udara luar." },
    ],
    hours: "Setiap hari 06.00–14.00 WIB",
    address: "Trayeman, Pleret, Bantul",
    maps: "https://maps.app.goo.gl/PrJGvj12NWoea6PG6?g_st=ic",
    reservasi: false,
    photos: [
      { src: "/images/trayeman/depan.jpg", alt: "Tampak depan Soto Saben Cab. Trayeman dari jalan raya" },
      { src: "/images/trayeman/ruang-dalam.jpg", alt: "Ruang makan hijau dengan atap genteng dan bata ekspos" },
      { src: "/images/trayeman/teras.jpg", alt: "Teras depan semi-terbuka Soto Saben Trayeman" },
      { src: "/images/trayeman/area-makan.jpg", alt: "Meja dan bangku kayu di ruang makan Trayeman" },
    ],
  },
];

export const EVENT_PHOTOS = [
  { src: "/images/pesanan/hajatan.jpg", caption: "Hajatan Malam di Halaman Rumah", kategori: "Acara" },
  { src: "/images/pesanan/gedung.jpg", caption: "Acara di Gedung & Kantor", kategori: "Acara" },
  { src: "/images/pesanan/racik.jpg", caption: "Diracik Langsung di Lokasi", kategori: "Acara" },
  { src: "/images/pesanan/kantor.jpg", caption: "Makan Siang Kantor", kategori: "Acara" },
  { src: "/images/pesanan/malam-kampung.jpg", caption: "Malam Tirakatan Kampung", kategori: "Acara" },
  { src: "/images/pesanan/acara-kantor.jpg", caption: "Prasmanan Soto Ratusan Porsi", kategori: "Acara" },
];

export const TAMU_PHOTOS = [
  { src: "/images/tamu/turis-1.jpg", caption: "Tamu dari Australia menikmati soto dan gorengan hangat" },
  { src: "/images/tamu/turis-2.jpg", caption: "Foto bersama sebelum pulang — katanya bakal balik lagi" },
  { src: "/images/tamu/turis-3.jpg", caption: "Mendoan hangat jadi favorit tamu mancanegara" },
];

export const GALLERY = [
  ...EVENT_PHOTOS,
  { src: "/images/soto-asli.jpg", caption: "Soto Pisah — bihun, suwiran ayam kampung, tomat, perkedel", kategori: "Hidangan" },
  { src: "/images/soto-1.jpg", caption: "Semangkuk soto ayam kampung hangat", kategori: "Hidangan" },
  { src: "/images/soto-2.jpg", caption: "Kuah kuning keemasan, dimasak sejak subuh", kategori: "Hidangan" },
  ...BRANCHES.flatMap((b) =>
    b.photos.map((p) => ({ src: p.src, caption: p.alt, kategori: "Cabang" }))
  ),
  { src: "/images/warung-asli.jpg", caption: "Tampak depan Warung Soto Saben", kategori: "Cabang" },
  ...TAMU_PHOTOS.map((p) => ({ ...p, kategori: "Cabang" })),
];

export const TESTIMONIALS = [
  {
    quote: "Kaldunya benar-benar beda — kuning, manis, gurih, asinnya pas, dan tidak bikin eneg. Anak saya sampai nambah dua kali.",
    name: "Bu Harti",
    context: "Arisan keluarga, Berbah",
    stars: 5,
  },
  {
    quote: "Pesan 120 porsi untuk acara kantor, datang tepat waktu dan masih mengepul. Diracik langsung di lokasi, tamu-tamu pada kagum.",
    name: "Pak Bambang",
    context: "Makan siang kantor, Kota Yogyakarta",
    stars: 5,
  },
  {
    quote: "Sarapan soto di Cabang Pleret memang langganan saya setiap hari Sabtu — sangat nagih sekali.",
    name: "Mas Danu",
    context: "Pelanggan",
    stars: 5,
  },
];

export const FAQS = [
  {
    q: "Bagaimana cara memesan?",
    a: "Semua pemesanan dilakukan lewat WhatsApp. Pilih menu di halaman ini lalu tekan tombol pesan — pesan WhatsApp akan tersusun otomatis, Anda tinggal mengirimnya.",
  },
  {
    q: "Berapa minimal pesanan untuk acara?",
    a: "Minimal 50 porsi untuk pesanan acara (hajatan, kantor, tirakatan, dan sebagainya). Kami siapkan, antar, dan bisa diracik langsung di lokasi acara Anda.",
  },
  {
    q: "Apakah bisa reservasi tempat untuk rombongan?",
    a: "Bisa, khusus Cabang Berbah — reservasi tempat minimal 10 orang. Silakan isi formulir di halaman Pesan atau hubungi kami lewat WhatsApp.",
  },
  {
    q: "Jam buka warungnya kapan saja?",
    a: "Cabang Berbah buka setiap hari 06.00–15.00 WIB. Cabang Keputren dan Trayeman buka setiap hari 06.00–14.00 WIB.",
  },
  {
    q: "Apakah harga bisa berubah?",
    a: "Harga di halaman ini dapat berubah sewaktu-waktu. Silakan konfirmasi harga terbaru saat memesan lewat WhatsApp.",
  },
];

export const MARQUEE_ITEMS = [
  "Soto Campur",
  "Soto Pisah",
  "Resep Turun-Temurun",
  "Melayani Pesanan",
  "Dimasak Sejak Subuh",
  "Kuah Kuning Keemasan",
];
