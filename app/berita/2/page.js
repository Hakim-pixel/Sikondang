// app/artikel/page.jsx
import Image from "next/image";
import Link from "next/link";

export default function ArtikelEkonomiKreatifSerang() {
  const trending = [
    {
      title: "Peluncuran Ulang Tahun Kota Serang, Serangfair",
      img: "/assets/berita/1.jpg",
      url: "/2"
    },
    {
      title: "Perkembangan UMKM Serang Tahun 2025",
      img: "/assets/berita/2.jpg",
      url: "#"
    },
    {
      title: "Kerja Bakti Sosial kelurahan Lopang",
      img: "/assets/berita/4.jpg",
      url: "#"
    },
    {
      title: "Festival Ekonomi Kreatif Serang Sukses Digelar",
      img: "/assets/berita/3.jpg",
      url: "#"
    },
    {
      title: "Kolaborasi Ekraf dan Pariwisata Serang",
      img: "/assets/berita/5.jpg",
      url: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* KONTEN UTAMA */}
        <div className="flex-1">
          {/* Gambar Utama */}
          <div className="w-full h-72 relative rounded-lg overflow-hidden">
            <Image
              src="/assets/berita/1.jpg"
              alt="Ekonomi Kreatif Serang"
              fill
              className="object-cover"
            />
          </div>

          {/* Judul */}
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Sekelompok Remaja Meresahkan Warga Ditengah Malam 
          </h1>

          {/* Tag */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Ekraf
            </span>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Data
            </span>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Kota Serang
            </span>
          </div>

          {/* Tanggal dan views */}
          <div className="text-sm text-gray-500 mt-2">
            10 Maret 2025 • 👁️ 201
          </div>

          {/* Kutipan */}
          <blockquote className="mt-6 italic text-blue-700 font-medium border-l-4 border-blue-700 pl-4">
            [Kota Cilegon], [8 Maret 2025] — Sejumlah warga di kawasan [Kotasari Cilegon] mengeluhkan aksi sekelompok remaja yang kerap menggeber sepeda motor berknalpot bising di jalan lingkungan pada malam hingga dini hari.
            Foto tersebut diambil dari salah satu pelaku di media sosial.
          </blockquote>

          {/* Isi Artikel */}
          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Menurut keterangan warga, aksi tersebut sudah berlangsung beberapa minggu terakhir.
              Para remaja itu biasanya berkumpul di tikungan dekat lapangan desa sebelum memacu motor mereka bolak-balik sambil memekakkan telinga.
            </p>
            <p>
              “Suara knalpotnya keras sekali, anak-anak saya sampai terbangun tengah malam. Apalagi kalau sudah lewat jam 11,
              rasanya nggak ada sopan-sopannya,” ujar [nama warga, 45 tahun], salah satu warga yang terganggu.

            </p>
            <p>
              Beberapa warga telah mencoba menegur secara langsung, namun para remaja tersebut justru kabur saat dihampiri.
              Kejadian ini membuat warga semakin resah dan meminta pihak kepolisian segera menindak.

            </p>
          </div>

          {/* Grafik Dummy */}
          <div className="mt-8 bg-gray-100 h-48 flex items-center justify-center rounded-md text-gray-500">
            📊 Grafik Statistik Ekonomi Kreatif (Dummy)
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <h2 className="font-bold text-lg mb-4 border-b-4 border-orange-500 pb-2">
            ARTIKEL TRENDING
          </h2>
          <div className="space-y-4">
            {trending.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition"
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
