import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-grow flex items-center px-8 md:px-16">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* Kolom Kiri: Teks & Ikon */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            SATU DATA
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-yellow-400">SIKONDANG</span>
          </h1>
          <p className="text-lg mt-2 mb-10 text-gray-300">
            SISTEM INFORMASI KOTA SERANG DALAM ANGKA
          </p>

          {/* Menu Ikon */}
          <div className="flex space-x-6">
            {/* Link ke Statistik dengan huruf kecil */}
            <Link href="/geospasial">
              <div className="flex flex-col items-center space-y-2">
               <div className="bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                  <Image src="/assets/maps.png" alt="Statistik" width={60} height={60} />
                </div>
                <p className="font-semibold text-white">Geospasial</p>
              </div>
            </Link>


            <Link href="/statistik">
              <div className="flex flex-col items-center space-y-2">
               <div className="bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                  <Image src="/assets/statistik.png" alt="Statistik" width={60} height={60} />
                </div>
                <p className="font-semibold text-white">Statistik</p>
              </div>
            </Link>

            <Link href="/perencanaan">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                <Image src="/assets/perencanaan.png" alt="Perencanaan" width={60} height={60} />
              </div>
              <p className="font-semibold text-white">Perencanaan</p>
            </div>
            </Link>
          </div>
          

        </div>

        {/* Kolom Kanan: Ilustrasi */}
        <div className="hidden md:block">
          <Image 
            src="/assets/hero-section.png" 
            alt="Data Illustration" 
            width={500} 
            height={400} 
            className="w-full h-auto"
          />
        </div>

      </div>
    </main>
  );
}