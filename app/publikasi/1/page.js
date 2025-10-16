"use client";

import { useEffect, useState } from "react";

export default function PublikasiDetail({ params }) {
  const { id } = params;
  const [publikasi, setPublikasi] = useState(null);
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resPublikasi = await fetch(`/api/publikasi/${id}`);
      if (resPublikasi.ok) {
        setPublikasi(await resPublikasi.json());
      }

      const resBerita = await fetch("/api/berita");
      if (resBerita.ok) {
        setBerita(await resBerita.json());
      }
    }
    fetchData();
  }, [id]);

  if (!publikasi) {
    return <p className="text-center py-10">Publikasi tidak ditemukan.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Kiri - Publikasi */}
      <div className="md:col-span-2">
        <img
          src={publikasi.image}
          alt={publikasi.title}
          className="rounded-xl mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{publikasi.title}</h1>
        <p className="text-gray-700">{publikasi.description}</p>
      </div>

      {/* Kanan - Berita Terbaru */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Berita Terbaru</h2>
        <ul className="space-y-2">
          {berita.map((item) => (
            <li
              key={item.id}
              className="border-b pb-2 hover:text-blue-600 cursor-pointer"
            >
              <p className="text-sm text-gray-500">{item.date}</p>
              <p className="font-medium">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
