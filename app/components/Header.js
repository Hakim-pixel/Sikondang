import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#007BFF] text-white py-2 px-8 md:px-16 flex justify-between items-center">
      {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-200">
      <Image src="/assets/kota-serang.png" alt="Logo Pemerintah Kota Serang" width={100} height={100} />
      <div>
        <p className="text-xs font-semibold leading-tight">PEMERINTAH</p>
        <p className="text-sm font-bold leading-tight">KOTA SERANG</p>
      </div>
    </Link>

      {/* Navigation Section */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="hover:text-yellow-400 transition-colors">Beranda</Link>
        <Link href="/organisasi" className="hover:text-yellow-400 transition-colors">Organisasi</Link>
        <Link href="/publikasi" className="hover:text-yellow-400 transition-colors">Publikasi</Link>
        <Link href="https://sikondang.serangkota.go.id/api/documentation" className="hover:text-yellow-400 transition-colors">Doc API</Link>
        <Link href="/Login"><button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors" >
          Login
        </button></Link>
      </nav>
    </header>
  );
}