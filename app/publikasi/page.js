'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Publikasi() {
  const router = useRouter();

  const dataPublikasi = [
    {
      id: 1,
      tahun: 2021,
      judul: 'BAGIAN DEPAN DISKOMINFO',
      image: '/assets/publikasi/p1.jpeg',
      tentang: 'Lorem ipsum.',
      kategori: 'Diskominfo',
      abstrak: 'Lorem ipsum.',
      lampiran: '/assets/publikasi/file1.pdf',
    },
    {
      id: 2,
      tahun: 2022,
      judul: 'DISKOMINFO AREA',
      image: '/assets/publikasi/p2.jpeg',
      tentang: 'Lorem ipsum.',
      kategori: 'Diskominfo',
      abstrak: 'Lorem ipsum.',
      lampiran: '/assets/publikasi/file2.pdf',
    },
    {
      id: 3,
      tahun: 2023,
      judul: 'RUANGAN E GOVERMENT',
      image: '/assets/publikasi/p3.jpeg',
      tentang: 'lorem ipsum.',
      kategori: 'Infografis Kecamatan',
      abstrak: 'Lorem Ipsum.',
      lampiran: '/assets/publikasi/file3.pdf',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('');
  const [filterTahun, setFilterTahun] = useState('');

  const filteredData = dataPublikasi.filter((item) => {
    const matchJudul = item.judul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = filterKategori === '' || item.kategori === filterKategori;
    const matchTahun = filterTahun === '' || item.tahun.toString() === filterTahun;
    return matchJudul && matchKategori && matchTahun;
  });

  return (
    <main className="w-full min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto bg-gray-100 min-h-screen py-10 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Data Publikasi</h1>

        {/* Filter */}
        <div className="flex gap-4 mb-6 flex-wrap items-center justify-center">
          <select
            className="border border-gray-400 px-2 py-[6px] rounded text-sm"
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="Diskominfo">Diskominfo</option>
            <option value="Infografis Kecamatan">Infografis Kecamatan</option>
            <option value="Ekonomi">Ekonomi</option>
          </select>

          <input
            type="text"
            placeholder="Tahun"
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="border border-gray-400 px-2 py-[6px] rounded text-sm w-[100px]"
          />

          <input
            type="text"
            placeholder="Judul"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 px-2 py-[6px] rounded text-sm w-64"
          />
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="p-3 border">No</th>
                <th className="p-3 border">Tahun</th>
                <th className="p-3 border">Detail</th>
                <th className="p-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => router.push(`/publikasi/${item.id}`)}
                    className="text-sm border-t cursor-pointer hover:bg-gray-50"
                  >
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{item.tahun}</td>
                    <td className="p-3 border">
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.judul}
                          className="w-24 h-32 object-cover border"
                        />
                        <div>
                          <p><strong>Judul:</strong> {item.judul}</p>
                          <p><strong>Tentang:</strong> {item.tentang}</p>
                          <p><strong>Tahun:</strong> {item.tahun}</p>
                          <p><strong>Kategori:</strong> {item.kategori}</p>
                          <p><strong>Abstrak:</strong> {item.abstrak}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 border text-center">
                      <a
                        href={item.lampiran}
                        download
                        onClick={(e) => e.stopPropagation()} // biar klik tombol ga ikut redirect row
                        className="px-3 py-[6px] text-sm border bg-blue-600 text-white rounded hover:bg-blue-900"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
