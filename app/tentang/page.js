// app/satudata/page.js
"use client";

import Link from "next/link";

export default function SatuDataPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Satu Data Kota Serang
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Portal resmi penyediaan, pengelolaan, dan pemanfaatan data untuk
            mendukung pembangunan Kota Serang yang transparan, akurat, dan
            berkelanjutan.
          </p>
          <div className="mt-6">
            <Link
              href="/dataset"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100"
            >
              Lihat Dataset
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Tentang Satu Data</h2>
            <p className="text-gray-700 leading-relaxed">
              Satu Data Kota Serang merupakan inisiatif pemerintah daerah untuk
              mewujudkan pengelolaan data yang lebih baik, terbuka, dan dapat
              diakses oleh masyarakat. Data yang tersedia mencakup berbagai
              sektor seperti pendidikan, kesehatan, infrastruktur, dan layanan
              publik.
            </p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">✔</span> Data
                Terbuka & Terstandar
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">✔</span> Sumber
                Terpercaya dari OPD Kota Serang
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">✔</span>{" "}
                Mendukung Perencanaan & Pembangunan
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Fitur Utama</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Dataset Terbuka</h3>
              <p className="text-gray-600">
                Akses ratusan dataset dari berbagai Organisasi Perangkat Daerah
                (OPD) Kota Serang.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Visualisasi Data</h3>
              <p className="text-gray-600">
                Sajian data dalam bentuk grafik, tabel, dan peta interaktif agar
                lebih mudah dipahami.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">API Terbuka</h3>
              <p className="text-gray-600">
                Gunakan API terbuka untuk integrasi data dengan aplikasi atau
                penelitian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Akses Data Kota Serang Sekarang
        </h2>
        <p className="text-gray-600 mb-6">
          Transparansi untuk masyarakat, data untuk pembangunan.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800"
        >
          Mulai Eksplorasi
        </Link>
      </section>
    </main>
  );
}
