"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BeritaPage() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchNews() {
      const res = await fetch("/api/berita");
      const data = await res.json();
      setNews(data);
    }
    fetchNews();
  }, []);

  const filteredNews = news.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Semua Berita & Pengumuman
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari berita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Scrollable News List */}
        {filteredNews.length > 0 ? (
          <div className="max-h-[600px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((a) => (
                <Card
                  key={a.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <Image
                    src={a.image}
                    alt={a.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight line-clamp-2">
                      {a.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {a.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{a.date}</span>
                      <Link
                        href={`/berita/${a.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                      >
                        Baca Selengkapnya <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada berita yang cocok dengan pencarian.
          </p>
        )}
      </div>
    </section>
  );
}
