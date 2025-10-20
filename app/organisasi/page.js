"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Organisasi() {
  const allOrganizations = [
    { name: "DINKES Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/dinkes" },
    { name: "BPBD Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/bpbd" },
    { name: "DISTAN Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/distan" },
    { name: "DISHUB Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/dishub" },
    { name: "BAPPEDA Kota Serang", logo: "/assets/organisasi/icon.png", type: "Statistik Sektoral", href: "/organisasi/bappeda" },
    { name: "BPKAD Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/bpkad" },
    { name: "DINSOS Kota Serang", logo: "/assets/organisasi/icon.png", type: "Statistik Sektoral", href: "/organisasi/dinsos" },
    { name: "BLHD Kota Serang", logo: "/assets/organisasi/icon.png", type: "Sikondang", href: "/organisasi/blhd" },
    { name: "DISDUKCAPIL Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/disdukcapil" },
    { name: "DISPERKIM Kota Serang", logo: "/assets/organisasi/icon.png", type: "Sikondang", href: "/organisasi/disperkim" },
    { name: "DISPERPUSDA Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/disperpusda" },
    { name: "INSPEKTORAT Kota Serang", logo: "/assets/organisasi/icon.png", type: "Open Data", href: "/organisasi/inspektorat" },
  ];

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrgs = allOrganizations.filter((org) => {
    const matchesType = filter === "All" || org.type === filter;
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-100 text-black text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">ORGANISASI</h1>
        <p className="mt-2">{filteredOrgs.length} Organisasi ditemukan</p>
        <div className="relative mt-4 w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cari nama organisasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-400 shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-10 px-4 md:px-6">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:block w-64 mr-10 flex-shrink-0">
          <h3 className="text-xl font-semibold mb-4">Halaman</h3>
          <div className="space-y-2">
            {["All", "Open Data", "Statistik Sektoral", "Sikondang"].map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="halaman"
                  value={cat}
                  checked={filter === cat}
                  onChange={() => setFilter(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
        </aside>

        {/* Filter mobile */}
        <div className="md:hidden mb-6">
          <label className="block mb-2 font-semibold">Filter</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {["All", "Open Data", "Statistik Sektoral", "Sikondang"].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Grid Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {filteredOrgs.map((org, idx) => (
            <Link
              href={org.href}
              key={idx}
              className="flex items-center bg-white rounded-md p-4 hover:shadow transition"
            >
              <Image
                src={org.logo}
                alt={org.name}
                width={40}
                height={40}
                className="object-contain mr-3"
              />
              <span className="text-[#0A1F44] font-medium text-sm">{org.name}</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
