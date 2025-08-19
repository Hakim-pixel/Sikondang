import Image from "next/image";
import Link from "next/link";

export default function GaleriPetaSerang() {
  const dataPeta = [
    {
      title: "BATAS KOTA SERANG 2024 AR",
      subtitle: "Batas_Kota_Serang_2024",
      image: "/peta-serang.png",
      link: "#",
    },
    {
      title: "BATAS WILAYAH KECAMATAN AR",
      subtitle: "Batas_Wilayah_Kecamatan",
      image: "/peta-serang.png",
      link: "#",
    },
    {
      title: "BATAS WILAYAH KELURAHAN AR",
      subtitle: "Batas_Wilayah_Kelurahan",
      image: "/peta-serang.png",
      link: "#",
    },
    {
      title: "BATAS WILAYAH RT AR",
      subtitle: "Batas_Wilayah_RT",
      image: "/peta-serang.png",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-4">
        Galeri untuk Serang Satu Peta
      </h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari galeri"
          className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <span className="text-gray-500">Filter</span>
        <span className="bg-gray-100 border rounded-full px-3 py-1">
          Kategori: Batas Wilayah
        </span>
        <button className="text-blue-500 hover:underline">Hapus filter</button>
      </div>

      {/* Grid Peta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dataPeta.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="border rounded shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-40 bg-gray-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold text-sm leading-snug">
                {item.title}
              </h2>
              <p className="text-gray-500 text-xs">{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
