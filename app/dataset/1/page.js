"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DetailDataset() {
  const [dataTable, setDataTable] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("/response_1755228308890.json")
      .then((res) => res.json())
      .then((json) => {
        setDataTable(json);

        if (json.length > 0) {
          // ambil total per tahun (smt1 + smt2)
          const tahunData = Object.entries(json[0].tahun).map(
            ([tahun, smt]) => {
              const total =
                (smt.smt1 === "-" ? 0 : Number(smt.smt1)) +
                (smt.smt2 === "-" ? 0 : Number(smt.smt2));
              return { tahun, total };
            }
          );
          setChartData(tahunData);
        }
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* KARTU INFO */}
      <div className="lg:col-span-2 bg-white border rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo */}
          <div className="w-24 h-24 relative">
            <Image
              src="/assets/kota-serang.png"
              alt="Logo Serang"
              fill
              className="object-contain"
            />
          </div>

          {/* Konten */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Detail Data Bidang Urusan - Sikondang
            </h2>

            <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
              <li>
                <span className="font-semibold">No Indikator:</span> 1002
              </li>
              <li>
                <span className="font-semibold">Bidang Urusan:</span> URUSAN
                PEMERINTAH BIDANG PERTANAHAN
              </li>
              <li>
                <span className="font-semibold">Indikator:</span> Luas Tanah
              </li>
              <li>
                <span className="font-semibold">Konsep:</span> Luas Tanah dengan
                Sertifikat Hak Wakaf di Kecamatan Kasemen berdasarkan Kelurahan
              </li>
              <li>
                <span className="font-semibold">Definisi:</span> Perwakafan
                tanah hak milik dilindungi dan diatur dengan Peraturan
                Pemerintah. Dan dengan demikian, maka sertifikat tanah itu
                sebagai alat pembuktian yang kuat bahwa tanah itu ada yang
                mengelola. Luas tanah adalah akumulasi sampai dengan tahun
                berjalan
              </li>
              <li>
                <span className="font-semibold">Ukuran:</span> Luas
              </li>
              <li>
                <span className="font-semibold">Periode:</span> Tahunan
              </li>
              <li>
                <span className="font-semibold">Peruntukan Data:</span> Data
                Provinsi
              </li>
              <li>
                <span className="font-semibold">Kelompok Data:</span> Data
                Sektoral (Induk)
              </li>
              <li>
                <span className="font-semibold">Satuan:</span> Hektar (Ha)
              </li>
            </ul>

            {/* Tombol Aksi */}
            <div className="flex gap-4 mt-6">
              <Link href="/response_1755228308890.json">
                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                  Lihat JSON
                </button>
              </Link>
              <a
                href="/unduh/data-sikondang.pdf"
                download
                className="bg-[#0A58CA] text-white px-4 py-2 rounded"
              >
                Unduh Sekarang
              </a>
            </div>
          </div>
        </div>
        {/* Metadata */}
        <div className="mt-6 text-sm text-gray-600">
          <p>
            <strong>Metadata Dibuat:</strong> 4 Juli 2025
          </p>
          <p>
            <strong>Metadata Diperbarui:</strong> 17 Juli 2025
          </p>
          <p>
            <strong>Sumber Data:</strong> Dinas Kominfo
          </p>
          <p>
            <strong>Jadwal Pemutakhiran:</strong> 1 Tahun Sekali
          </p>
          <p>
            <strong>Sifat Data:</strong> Terbuka
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th className="border px-2 py-2">No</th>
              <th className="border px-2 py-2">Kode SSD</th>
              <th className="border px-2 py-2">Uraian</th>
              <th className="border px-2 py-2">Klasifikasi</th>
              <th className="border px-2 py-2">Satuan</th>
              <th className="border px-2 py-2">2023</th>
              <th className="border px-2 py-2">2024</th>
              <th className="border px-2 py-2">2025</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row, idx) => (
              <tr key={row.id} className="text-center">
                <td className="border px-2 py-2">{idx + 1}</td>
                <td className="border px-2 py-2">{row.kode_ssd}</td>
                <td className="border px-2 py-2 text-left">{row.uraian}</td>
                <td className="border px-2 py-2">{row.klasifikasi}</td>
                <td className="border px-2 py-2">{row.satuan}</td>

                {/* Tahun 2023 */}
                <td className="border px-2 py-2 bg-blue-500 text-white">
                  {row.tahun?.["2023"]
                    ? (row.tahun["2023"].smt1 === "-" ? 0 : Number(row.tahun["2023"].smt1)) +
                      (row.tahun["2023"].smt2 === "-" ? 0 : Number(row.tahun["2023"].smt2))
                    : "-"}
                </td>

                {/* Tahun 2024 */}
                <td className="border px-2 py-2 bg-blue-500 text-white">
                  {row.tahun?.["2024"]
                    ? (row.tahun["2024"].smt1 === "-" ? 0 : Number(row.tahun["2024"].smt1)) +
                      (row.tahun["2024"].smt2 === "-" ? 0 : Number(row.tahun["2024"].smt2))
                    : "-"}
                </td>

                {/* Tahun 2025 */}
                <td className="border px-2 py-2 bg-blue-500 text-white">
                  {row.tahun?.["2025"]
                    ? (row.tahun["2025"].smt1 === "-" ? 0 : Number(row.tahun["2025"].smt1)) +
                      (row.tahun["2025"].smt2 === "-" ? 0 : Number(row.tahun["2025"].smt2))
                    : "-"}
                </td>
              </tr>
            ))}

            {dataTable.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CHART */}
      <h2 className="text-xl font-semibold mb-4">Grafik Data per Tahun</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#1e88e5" name="Total per Tahun" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
