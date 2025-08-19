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
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-4">
        📊 Perencanaan {id}
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Halaman ini memuat informasi mengenai rencana strategis Dinas {id} Kota Serang dalam mendukung pengembangan teknologi informasi dan komunikasi.
      </p>

      <div className="flex flex-col gap-6">
        {plans.map((plan, index) => (
          <Link key={index} href={`/perencanaan/${id}/${plan.slug}`}
            className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-blue-700 mb-1">{plan.title}</h2>
           <p className="text-gray-700 mb-1">{plan.desc}</p>
           <p className="text-sm text-gray-500">Tahun: {plan.year}</p>
          </Link>

        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          📂 Unduh Semua Dokumen
        </button>
      </div>
    </main>
  );
}
