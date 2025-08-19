'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// Dynamic import komponen react-leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    (async () => {
      const L = await import('leaflet');

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
        iconUrl: '/leaflet/images/marker-icon.png',
        shadowUrl: '/leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  // ---- Data ----
  const stats = [
    { title: 'Luas Wilayah (km²)', value: '266,71', desc: 'Perda No. 6 Tahun 2025' },
    { title: 'Jumlah Penduduk', value: '723.794', desc: 'PDAK KEMENDAGRI 2024' },
    { title: 'Jumlah KK', value: '24.674', desc: 'PDAK KEMENDAGRI 2024' },
    { title: 'Laki-laki', value: '369.567', desc: 'PDAK KEMENDAGRI 2024' },
    { title: 'Perempuan', value: '354.227', desc: 'PDAK KEMENDAGRI 2024' },
  ];

  const datasets = [
    { title: 'BATAS WILAYAH', icon: '/assets/geospasial/peta.png' },
    { title: 'DATASET KHUSUS', icon: '/assets/geospasial/dataset.png' },
    { title: 'GEOLOGI', icon: '/assets/geospasial/geologi.png' },
    { title: 'HIDROGRAFI', icon: '/assets/geospasial/HIDROGRAFI.png' },
    { title: 'HIPSOGRAFI', icon: '/assets/geospasial/hipsografi.png' },
    { title: 'KEBENCAAN', icon: '/assets/geospasial/kebencanaan.png' },
    { title: 'LINGKUNGAN', icon: '/assets/geospasial/lingkunganterbangun.png' },
    { title: 'TRANSPORTASI', icon: '/assets/geospasial/transportasi.png' },
    { title: 'UTILITAS', icon: '/assets/geospasial/utility.png' },
    { title: 'VEGETASI', icon: '/assets/geospasial/vegetasi.png' },
  ];

  const simpul = [
    { title: 'BKPSDM', icon: '/assets/geospasial/peta.png' },
    { title: 'KESBANGPOL', icon: '/assets/geospasial/peta.png' },
    { title: 'BPBD', icon: '/assets/geospasial/peta.png' },
    { title: 'BAPENDA', icon: '/assets/geospasial/peta.png' },
    { title: 'BPKD', icon: '/assets/geospasial/peta.png' },
    { title: 'BAPPEDA', icon: '/assets/geospasial/peta.png' },
    { title: 'DISKOMINFO', icon: '/assets/geospasial/peta.png' },
    { title: 'DISKUKM', icon: '/assets/geospasial/peta.png' },
    { title: 'DINHUB', icon: '/assets/geospasial/peta.png' },
    { title: 'PENDUDUKAN', icon: '/assets/geospasial/peta.png' },
  ];

  return (
    <main className="flex flex-col items-center w-full">
      <button
        onClick={() => {
          document.documentElement.classList.toggle('dark');
        }}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        🌙
      </button>

      {/* HERO */}
      <div className="relative w-full h-[500px] flex items-center justify-center text-center">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src="/assets/geospasial/shoot-serang.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-white px-4">
          <div className="flex items-center justify-center mb-4">
            <img src="/assets/geospasial/peta.png" alt="Logo" className="w-18 h-18 mr-2" />
            <h1 className="text-4xl font-bold">SERANG SATU PETA</h1>
          </div>
          <p className="mb-4 max-w-2xl mx-auto">
            Portal Geospasial Pemerintah Kota Serang.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Menjelajahi
          </button>
        </div>
      </div>

      {/* STATISTIK */}
      <section className="flex flex-wrap justify-center gap-6 py-10 bg-white dark:bg-gray-900 w-full">
        {stats.map((s, i) => (
          <div
            key={i}
            className="w-48 p-4 rounded-lg shadow border text-center bg-white dark:bg-gray-800"
          >
            <h3 className="text-xs text-gray-600 dark:text-gray-300 mb-1">{s.title}</h3>
            <p className="text-2xl font-bold dark:text-white">{s.value}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-400">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* KATALOG DATASET */}
      <section className="w-full py-12 bg-white dark:bg-gray-800 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Katalog Dataset</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-4">
          {datasets.map((ds, i) => (
            <Link
              key={i}
              href={`/katalog/${ds.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="w-20 h-20 rounded-full border-4 border-blue-700 flex items-center justify-center shadow-md transition transform duration-300 ease-in-out group-hover:scale-110 active:scale-95 bg-white overflow-hidden">
                <img
                  src={ds.icon}
                  alt={ds.title}
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-gray-800 dark:text-white text-center">{ds.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SIMPUL JARINGAN */}
      <section className="w-full py-12 bg-white dark:bg-gray-900 text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Simpul Jaringan Informasi Geospasial
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          Pemerintah Kota Serang
        </p>
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-5 gap-8 px-4 justify-items-center">
          {simpul.map((s, i) => (
            <Link
              href={`/simpul/${s.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={i}
              className="
                relative flex flex-col items-center p-4
                bg-white dark:bg-gray-800
                border-2 border-gray-300
                rounded-b-[40%]
                shadow-md transition-all duration-300
                hover:border-blue-500 hover:shadow-xl
              "
            >
              <div className="w-20 h-20 mb-2 flex items-center justify-center">
                <img
                  src={s.icon}
                  alt={s.title}
                  className="
                    w-16 h-16 object-contain
                    transition-transform duration-500
                    group-hover:scale-110 group-hover:rotate-3
                  "
                />
              </div>
              <p className="text-xs text-gray-700 dark:text-white font-semibold">
                {s.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* PETA */}
      <section className="w-full h-[400px]">
        <MapContainer center={[-6.1128, 106.1502]} zoom={12} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[-6.1128, 106.1502]}>
            <Popup>Ini Pusat Kota Serang, Banten.</Popup>
          </Marker>
        </MapContainer>
      </section>
    </main>
  );
}
