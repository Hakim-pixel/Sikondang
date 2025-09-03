"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DatasetPage() {
  const [datasets, setDatasets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/dataset");
      const data = await res.json();
      setDatasets(data);
    }
    fetchData();
  }, []);

  const filteredDatasets = datasets.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 flex flex-col h-[80vh]">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 flex-shrink-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Semua Dataset
            </h2>
            <p className="text-xl text-gray-600">
              Kumpulan dataset terbuka Kota Serang
            </p>
          </div>
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari dataset..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Scrollable Dataset Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          {filteredDatasets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDatasets.map((d) => (
                <Card
                  key={d.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{d.category}</Badge>
                      <div className="flex gap-1">
                        {d.format.map((f, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {d.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {d.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" /> {d.downloads} unduhan
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {d.lastUpdate}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Unduh
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dataset/${d.id}`}>Detail</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Dataset tidak ditemukan.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
