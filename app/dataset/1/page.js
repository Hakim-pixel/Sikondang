"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

export default function DetailDatasetAKIP() {
  const [dataKominfo, setDataKominfo] = useState([]);

  useEffect(() => {
    fetch("/response_1755228308890.json")
      .then((res) => res.json())
      .then((json) => setDataKominfo(json.data_kominfo || []));
  }, []);

  // Data untuk chart: hitung jumlah per nama_satuan
  const chartData = Object.values(
    dataKominfo.reduce((acc, item) => {
      if (!acc[item.nama_satuan]) {
        acc[item.nama_satuan] = { nama_satuan: item.nama_satuan, jumlah: 0 };
      }
      acc[item.nama_satuan].jumlah += 1;
      return acc;
    }, {})
  );

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI */}
        <div className="lg:col-span-2 bg-white border rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/assets/kota-serang.png"
                alt="Logo Serang"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Dataset Indikator Kinerja Kominfo
              </h2>
              <li className="text-gray-600 mb-4">
                Data indikator kinerja kunci yang berkaitan dengan urusan pemerintahan bidang komunikasi dan informatika.
              </li>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>kode_sdsn : Kode Standar Data Sektoral Nasional</li>
                <li>konsep : Deskripsi indikator</li>
                <li>status : Status data</li>
                <li>nama_satuan : Satuan data</li>
              </ul>
              <div className="flex gap-4 mt-6">
                <Link href="/response_1755228308890.json">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    Lihat JSON
                  </button>
                </Link>
                <Link href="/unduh/data-kominfo.pdf">
                  <button className="bg-[#0A58CA] text-white px-4 py-2 rounded">
                    Unduh Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-6 text-sm text-gray-600">
            <p><strong>Metadata Dibuat:</strong> 4 Juli 2025</p>
            <p><strong>Metadata Diperbarui:</strong> 17 Juli 2025</p>
            <p><strong>Sumber Data:</strong> Dinas Kominfo</p>
            <p><strong>Jadwal Pemutakhiran:</strong> 1 Tahun Sekali</p>
            <p><strong>Sifat Data:</strong> Terbuka</p>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">kode_sdsn</th>
                  <th className="px-4 py-2 border">konsep</th>
                  <th className="px-4 py-2 border">status</th>
                  <th className="px-4 py-2 border">nama_satuan</th>
                </tr>
              </thead>
              <tbody>
                {dataKominfo.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border">{item.kode_sdsn}</td>
                    <td className="px-4 py-2 border">{item.konsep}</td>
                    <td className="px-4 py-2 border">{item.status}</td>
                    <td className="px-4 py-2 border">{item.nama_satuan}</td>
                  </tr>
                ))}
                {dataKominfo.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                      Memuat data...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="mt-10">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Diagram Jumlah Indikator per Satuan
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama_satuan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jumlah" fill="#0A58CA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div>
          <h3 className="text-base font-bold text-orange-600 border-l-4 border-orange-600 pl-2 mb-4">
            DATASET TERKAIT
          </h3>
          <div className="space-y-4">
            {dataKominfo.slice(0, 4).map((item) => (
              <Link key={item.id} href={`/dataset/${item.id}`} className="block">
                <div className="flex gap-4 bg-white border rounded-lg shadow-sm p-4 hover:bg-gray-50 transition">
                  <div className="w-16 h-16 relative">
                    <Image src="/assets/kota-serang.png" alt="Logo Dataset" fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">
                      {item.konsep}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge className="bg-[#0A58CA] text-white text-xs">Open Data</Badge>
                      <Badge variant="outline" className="text-xs">{item.nama_satuan}</Badge>
                      <Badge variant="outline" className="text-xs">{item.status}</Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
