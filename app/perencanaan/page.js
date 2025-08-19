"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const opdsData = [
  {
    id: "pendidikan",
    name: "DINAS PENDIDIKAN DAN KEBUDAYAAN",
    description: "Data dan Statistik Pendidikan, Program Sekolah, Kurikulum.",
    logo: "/assets/perencanaan/pendidikan.png",
  },
  {
    id: "kesehatan",
    name: "DINAS KESEHATAN",
    description: "Informasi Kesehatan Masyarakat, Data Fasilitas Kesehatan.",
    logo: "/assets/perencanaan/kesehatan.png",
  },
  {
    id: "pupr",
    name: "DINAS PEKERJAAN UMUM DAN PENATAAN RUANG",
    description: "Pembangunan Infrastruktur, Penataan Kota, Tata Ruang.",
    logo: "/assets/perencanaan/PUPR.png",
  },
  {
    id: "Diskominfo",
    name: "DISKOMINFO KOTA SERANG",
    description: "Pengembangan Teknologi Informasi, Informasi Publik dan Persandian.",
    logo: "/assets/perencanaan/kominfo.png",
  },
  {
    id: "sosial",
    name: "DINAS SOSIAL",
    description: "Program Kesejahteraan Sosial, Pemberdayaan Masyarakat.",
    logo: "/assets/perencanaan/dinsos.png",
  },
];

export default function Perencanaan() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOpds = opdsData.filter(
    (opd) =>
      opd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <Head>
        <title>Perencanaan Data - Kota Serang</title>
        <meta
          name="description"
          content="Halaman perencanaan data untuk OPD Kota Serang"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Perencanaan</h1>

        <div className="flex justify-center mb-10">
          <div className="flex w-full max-w-md border border-gray-300 rounded-full overflow-hidden shadow">
            <input
              type="text"
              placeholder="Pencarian OPD..."
              className="flex-grow px-4 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="px-4 bg-blue-600 text-white hover:bg-blue-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredOpds.length > 0 ? (
            filteredOpds.map((opd) => (
              <Link
                href={`/perencanaan/${opd.id}`}
                key={opd.id}
                className="block border border-gray-200 rounded-lg shadow hover:shadow-lg transition hover:-translate-y-1 p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={opd.logo || "/assets/default-logo.png"}
                    alt={`Logo ${opd.name}`}
                    width={70}
                    height={70}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{opd.name}</h3>
                <p className="text-gray-600 text-sm">{opd.description}</p>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada OPD yang sesuai dengan pencarian Anda.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
