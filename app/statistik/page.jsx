"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  BarChart3,
  Users,
  Building2,
  TrendingUp,
  Database,
  FileText,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

/* =========================
   DATA DUMMY
========================= */
const stats = [
  { title: "Total Dataset", value: "1,247", icon: Database, color: "text-blue-600" },
  { title: "Organisasi", value: "45", icon: Building2, color: "text-green-600" },
  { title: "Unduhan Bulan Ini", value: "12,543", icon: Download, color: "text-purple-600" },
  { title: "Pengguna Aktif", value: "8,921", icon: Users, color: "text-orange-600" },
]

const featuredDatasets = [
  {
    id: 1760665177495,
    title: "Detail Data Bidang Urusan Pertanian - Sikondang",
    description:
      "Data indikator kinerja kunci yang berkaitan dengan urusan pertanahan kota serang.",
    category: "Dataset",
    downloads: "2,341",
    lastUpdate: "17 Juli 2025",
    format: ["CSV", "JSON", "PDF"],
  },
  {
    id: 2,
    title: "APBD Kota Serang 2024",
    description: "Anggaran Pendapatan dan Belanja Daerah Kota Serang tahun anggaran 2024",
    category: "Keuangan",
    downloads: "1,892",
    lastUpdate: "10 Jan 2024",
    format: ["PDF", "Excel"],
  },
  {
    id: 3,
    title: "Data Pendidikan Sekolah Dasar",
    description: "Informasi lengkap sekolah dasar di Kota Serang meliputi jumlah siswa, guru, dan fasilitas",
    category: "Pendidikan",
    downloads: "1,567",
    lastUpdate: "08 Jan 2024",
    format: ["CSV", "JSON"],
  },
]

const categories = [
  { name: "Kependudukan", count: 156, icon: Users, href: "/dataset?category=kependudukan" },
  { name: "Ekonomi", count: 89, icon: TrendingUp, href: "/dataset?category=ekonomi" },
  { name: "Pendidikan", count: 134, icon: FileText, href: "/dataset?category=pendidikan" },
  { name: "Kesehatan", count: 78, icon: BarChart3, href: "/dataset?category=kesehatan" },
  { name: "Infrastruktur", count: 92, icon: Building2, href: "/dataset?category=infrastruktur" },
  { name: "Lingkungan", count: 67, icon: MapPin, href: "/dataset?category=lingkungan" },
]

const latestNews = [
  {
    id: 1,
    title: "Sekelompok Remaja Meresahkan Warga Ditengah Malam",
    excerpt:
      "[Kota Cilegon], [8 Maret 2025] — Sejumlah warga di kawasan [Kotasari Cilegon] mengeluhkan aksi sekelompok remaja yang kerap menggeber sepeda motor berknalpot bising...",
    date: "15 Januari 2024",
    image: "/assets/berita/balap.jpg",
  },
  {
    id: 2,
    title: "Update Sistem Portal Satudata: Fitur Visualisasi Data",
    excerpt: "Portal Satudata Kota Serang kini dilengkapi dengan fitur visualisasi data interaktif...",
    date: "12 Januari 2024",
    image: "/assets/berita/berita2.png",
  },
  {
    id: 3,
    title: "Workshop Pemanfaatan Data Terbuka untuk Peneliti",
    excerpt: "Dinas Komunikasi dan Informatika Kota Serang mengadakan workshop pemanfaatan data terbuka...",
    date: "10 Januari 2024",
    image: "/assets/berita/berita3.png",
  },
]

/* =========================
   KOMPONEN KECIL
========================= */
function StatsGrid() {
  return (
    <section className="py-16 -mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoriesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kategori Data</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi berbagai kategori data yang tersedia untuk mendukung analisis dan penelitian Anda
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((c, i) => (
            <Link key={i} href={c.href}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <c.icon className="h-12 w-12 mx-auto mb-4 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <h3 className="font-semibold text-gray-900 mb-2">{c.name}</h3>
                  <p className="text-sm text-gray-600">{c.count} dataset</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedDatasets() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dataset Unggulan</h2>
            <p className="text-xl text-gray-600">Dataset yang paling banyak diakses dan diunduh</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/dataset">
              Lihat Semua Dataset <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDatasets.map((d) => (
            <Card key={d.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                <CardTitle className="text-lg leading-tight">{d.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-3">{d.description}</CardDescription>
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

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/dataset">
              Lihat Semua Dataset <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function LatestNews() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Berita & Pengumuman</h2>
            <p className="text-xl text-gray-600">Informasi terbaru seputar data dan layanan Satudata</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/berita">
              Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((a) => (
            <Card
              key={a.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <Image src={a.image} alt={a.title} width={400} height={200} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-lg leading-tight line-clamp-2">{a.title}</CardTitle>
                <CardDescription className="line-clamp-3">{a.excerpt}</CardDescription>
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

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/berita">
              Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

/* =========================
   HALAMAN UTAMA
========================= */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r bg-[#006BFF] text-white py-10">
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Portal Satu Data <br /> <span className="text-blue-200">Kota Serang</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Akses mudah dan transparan terhadap data pemerintahan Kota Serang. Temukan, unduh, dan manfaatkan data
              untuk pembangunan yang lebih baik.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Cari dataset, organisasi, atau topik..."
                  className="pl-12 h-14 w-full rounded-2xl border border-gray-300 bg-white text-gray-900 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold border border-gray-300 shadow-sm"
              >
                <Search className="mr-2 h-5 w-5" />
                Cari Data
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dataset">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Jelajahi Dataset
                </Button>
              </Link>
              <Link href="/organisasi">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Lihat Organisasi
                </Button>
              </Link>
              <Link href="/tentang">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Tentang Satudata
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsGrid />
      <CategoriesGrid />
      <FeaturedDatasets />
      <LatestNews />
    </div>
  )
}
