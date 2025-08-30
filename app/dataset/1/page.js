"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DetailDataset() {
  const [dataTable, setDataTable] = useState([]);
  const [chartData, setChartData] = useState([]);

  // 🔹 Ambil data JSON
  useEffect(() => {
    fetch("/response_1755228308890.json")
      .then((res) => res.json())
      .then((json) => {
        setDataTable(json);

        if (json.length > 0) {
          const tahunKeys = Object.keys(json[0].tahun);

          const tahunData = tahunKeys.map((tahun) => {
            let total = 0;

            json.forEach((row) => {
              const valSmt1 =
                row.tahun[tahun]?.smt1 === "-" ? 0 : Number(row.tahun[tahun]?.smt1);
              const valSmt2 =
                row.tahun[tahun]?.smt2 === "-" ? 0 : Number(row.tahun[tahun]?.smt2);

              total += valSmt1 + valSmt2;
            });

            return { tahun, total };
          });

          setChartData(tahunData);
        }
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  // 🔹 Fungsi download tabel + chart ke Excel
  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Data Tabel
    const tableSheet = XLSX.utils.json_to_sheet(
      dataTable.map((row, idx) => ({
        No: idx + 1,
        "Kode SSD": row.kode_ssd,
        Uraian: row.uraian,
        Klasifikasi: row.klasifikasi,
        Satuan: row.satuan,
        "2023":
          row.tahun?.["2023"]
            ? (row.tahun["2023"].smt1 === "-" ? 0 : Number(row.tahun["2023"].smt1)) +
              (row.tahun["2023"].smt2 === "-" ? 0 : Number(row.tahun["2023"].smt2))
            : "-",
        "2024":
          row.tahun?.["2024"]
            ? (row.tahun["2024"].smt1 === "-" ? 0 : Number(row.tahun["2024"].smt1)) +
              (row.tahun["2024"].smt2 === "-" ? 0 : Number(row.tahun["2024"].smt2))
            : "-",
        "2025":
          row.tahun?.["2025"]
            ? (row.tahun["2025"].smt1 === "-" ? 0 : Number(row.tahun["2025"].smt1)) +
              (row.tahun["2025"].smt2 === "-" ? 0 : Number(row.tahun["2025"].smt2))
            : "-",
      }))
    );
    XLSX.utils.book_append_sheet(wb, tableSheet, "Tabel Data");

    // Sheet 2: Data Chart
    const chartSheet = XLSX.utils.json_to_sheet(chartData);
    XLSX.utils.book_append_sheet(wb, chartSheet, "Chart Data");

    XLSX.writeFile(wb, "data-sikondang.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ========================= KARTU INFO ========================= */}
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
              Luas Tanah Pertanian Sekota Serang
            </h2>

            <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
              <li><span className="font-semibold">No Indikator:</span> 1002</li>
              <li><span className="font-semibold">Bidang Urusan:</span> URUSAN PEMERINTAH BIDANG PERTANAHAN</li>
              <li><span className="font-semibold">Indikator:</span> Luas Tanah</li>
              <li><span className="font-semibold">Konsep:</span> Luas Tanah Pertanian Sekota Serang</li>
              <li><span className="font-semibold">Definisi:</span> Perwakafan tanah hak milik dilindungi dan diatur dengan Peraturan Pemerintah.</li>
              <li><span className="font-semibold">Ukuran:</span> Luas</li>
              <li><span className="font-semibold">Periode:</span> Tahunan</li>
              <li><span className="font-semibold">Peruntukan Data:</span> Data Provinsi</li>
              <li><span className="font-semibold">Kelompok Data:</span> Data Sektoral (Induk)</li>
              <li><span className="font-semibold">Satuan:</span> Hektar (Ha)</li>
            </ul>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap gap-4 mt-6">
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
                Unduh PDF
              </a>
              <button
                onClick={handleDownloadExcel}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Unduh Data (Excel)
              </button>
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
      </div>

      {/* ========================= TABLE ========================= */}
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
                {["2023", "2024", "2025"].map((tahun) => {
                  const val = row.tahun?.[tahun]
                    ? (row.tahun[tahun].smt1 === "-" ? 0 : Number(row.tahun[tahun].smt1)) +
                      (row.tahun[tahun].smt2 === "-" ? 0 : Number(row.tahun[tahun].smt2))
                    : "-";
                  return (
                    <td key={tahun} className="border px-2 py-2 bg-blue-500 text-white">
                      {val}
                    </td>
                  );
                })}
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

      {/* ========================= CHART ========================= */}
      <h2 className="text-xl font-semibold mb-4">Grafik Data per Tahun</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-10">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#0A58CA" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ========================= CHART MIRING ========================= */}
      <h2 className="text-xl font-semibold mb-4">Grafik Data per Tahun</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="tahun" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#198754" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
