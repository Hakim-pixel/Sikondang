"use client";

import Link from "next/link";

export default function MaintenancePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      {/* Logo atau ilustrasi */}
      <div className="mb-8">
        <img
          src="/assets/kota-serang.png"
          alt="Logo Pemerintah Kota Serang"
          className="w-24 h-24 mx-auto object-contain"
        />
      </div>

      {/* Judul */}
      <h1 className="text-4xl font-bold text-[#0A1F44] mb-4">Sedang Dalam Perbaikan</h1>

      {/* Deskripsi */}
      <p className="text-gray-700 mb-6 max-w-md">
        Situs ini sedang menjalani pemeliharaan rutin. Mohon maaf atas ketidaknyamanannya.
        Silakan kembali lagi nanti.
      </p>

      {/* Tombol kembali */}
      <Link href="/" className="bg-[#007BFF] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors">
        Kembali ke Beranda
      </Link>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Pemerintah Kota Serang. All rights reserved.
      </footer>
    </main>
  );
}
