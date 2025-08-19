'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Organisasi() {
  const allOrganizations = [
    { name: 'DINKES Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
    { name: 'BPBD Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
    { name: 'DISTAN Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
    { name: 'DISHUB Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
    { name: 'BAPPEDA Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Statistik Sektoral', href: '#' },
    { name: 'BPKAD Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
    { name: 'DINSOS Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Statistik Sektoral', href: '#' },
    { name: 'BLHD Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Sikondang', href: '#' },
    { name: 'DISDUKCAPIL Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
    { name: 'DISPERKIM Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Sikondang', href: '#' },
    { name: 'DISPERPUSDA Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
    { name: 'INSPEKTORAT Kota Serang', logo: '/assets/organisasi/icon.png', type: 'Open Data', href: '#' },
  ];

  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrgs = allOrganizations.filter((org) => {
    const matchesType = filter === 'All' || org.type === filter;
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-100 text-black text-center py-10">
        <h1 className="text-4xl font-bold">ORGANISASI</h1>
        <p className="mt-2">{filteredOrgs.length} Organisasi ditemukan</p>
        <div className="relative mt-4 w-1/2 mx-auto">
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
      <div className="flex max-w-7xl mx-auto py-10 px-6">
        {/* Sidebar */}
        <aside className="w-64 mr-10">
          <h3 className="text-xl font-semibold mb-4">Halaman</h3>
          <div className="space-y-2">
            {['All', 'Open Data', 'Statistik Sektoral', 'Sikondang'].map((cat) => (
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

        {/* Grid Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {filteredOrgs.map((org, idx) => (
            <Link
              href={org.href}
              key={idx}
              className="flex items-center bg-[#ffffff] rounded-md p-4 hover:shadow transition"
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
