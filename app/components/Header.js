"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#007BFF] text-white py-2 px-8 md:px-16 flex justify-between items-center relative">
      {/* Logo Section */}
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-80 transition-all duration-200"
      >
        <Image
          src="/assets/kota-serang.png"
          alt="Logo Pemerintah Kota Serang"
          width={100}
          height={100}
          className="object-contain"
        />
        <div>
          <p className="text-xs font-semibold leading-tight">PEMERINTAH</p>
          <p className="text-sm font-bold leading-tight">KOTA SERANG</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Beranda
        </Link>
        <Link href="/organisasi" className="hover:text-yellow-400 transition-colors">
          Organisasi
        </Link>
        <Link href="/publikasi" className="hover:text-yellow-400 transition-colors">
          Publikasi
        </Link>
        <Link
          href="https://sikondang.serangkota.go.id/api/documentation"
          className="hover:text-yellow-400 transition-colors"
        >
          Doc API
        </Link>
        <Link href="/login">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
            Login
          </button>
        </Link>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden relative">
        <button
          className="text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-[#007BFF] flex flex-col shadow-lg z-50 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            href="/"
            className="px-4 py-2 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </Link>
          <Link
            href="/organisasi"
            className="px-4 py-2 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Organisasi
          </Link>
          <Link
            href="/publikasi"
            className="px-4 py-2 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Publikasi
          </Link>
          <Link
            href="https://sikondang.serangkota.go.id/api/documentation"
            className="px-4 py-2 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Doc API
          </Link>
          <Link href="/uptodate" onClick={() => setIsOpen(false)}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md w-full mt-1">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
