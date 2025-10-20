import Link from "next/link";

export async function generateStaticParams() {
  return [
    { id: 'Diskominfo' },
    { id: 'pupr' },
    { id: 'kesehatan' },
  ];
}

export default function PerencanaanDetail({ params }) {
  const { id } = params;

  const plans = [
    {
      slug: 'infrastruktur-it',
      title: 'Rencana Pengembangan Infrastruktur IT',
      desc: 'Membangun dan meningkatkan infrastruktur teknologi informasi di lingkungan Diskominfo Kota Serang.',
      year: 2025,
    },
    {
      slug: 'transformasi-digital',
      title: 'Transformasi Digital Layanan Publik',
      desc: 'Mendorong digitalisasi layanan publik agar lebih cepat, transparan, dan efisien.',
      year: 2025,
    },
    {
      slug: 'keamanan-informasi',
      title: 'Penguatan Keamanan Informasi',
      desc: 'Menjamin keamanan data pemerintah daerah dengan standar keamanan informasi.',
      year: 2025,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Judul Halaman */}
        <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-4">
          📊 Perencanaan {id}
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Halaman ini memuat informasi mengenai rencana strategis Dinas {id} Kota Serang dalam mendukung pengembangan teknologi informasi dan komunikasi.
        </p>

        {/* Daftar Rencana */}
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Link
              key={index}
              href={`/perencanaan/${id}/${plan.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{plan.title}</h2>
              <p className="text-gray-700 mb-3">{plan.desc}</p>
              <p className="text-sm text-gray-500">Tahun: {plan.year}</p>
            </Link>
          ))}
        </div>

        {/* Tombol Unduh */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg transition-colors duration-300">
            📂 Unduh Semua Dokumen
          </button>
        </div>
      </div>
    </main>
  );
}
