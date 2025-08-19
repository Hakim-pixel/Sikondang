export default function Footer() {
  return (
    <footer className="w-full bg-[#007BFF] text-white px-4 py-6 text-sm leading-tight">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* KIRI */}
        <div className="w-full md:w-3/4 flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <img src="/assets/kota-serang.png" alt="Pemkot Serang" className="h-8 w-auto" />
            <img src="/assets/footer/kominfo.png" alt="Diskominfo Serang" className="h-8 w-auto" />
            <img src="/assets/footer/smk.png" alt="SMK" className="h-8 w-auto" />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Alamat & Kontak */}
            <div className="flex flex-col gap-2.5">
              <div>
                <h4 className="font-semibold text-sm">📍 Kantor Wali Kota Serang</h4>
                <p className="text-xs">
                  Jl. Jendral Sudirman No. 5, Kota Serang, Banten 42118
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">📧 Kritik dan Saran</h4>
                <p className="text-xs">info@serangkota.go.id</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">🗂️ Your IP Address</h4>
                <p className="text-xs">103.102.250.13</p>
              </div>
            </div>

            {/* Statistik */}
            <div className="flex flex-col gap-2.5">
              <h4 className="font-semibold text-sm">📈 Statistik Pengunjung</h4>
              <div className="flex gap-3 text-xs">
                <span className="bg-black px-2 py-0.5 rounded text-[10px]">58</span> Hari ini
              </div>
              <div className="flex gap-3 text-xs">
                <span className="bg-black px-2 py-0.5 rounded text-[10px]">2041</span> Bulan ini
              </div>
            </div>

            {/* Media Sosial */}
            <div className="flex flex-col gap-2.5">
              <h4 className="font-semibold text-sm">🔗 Media Sosial</h4>
              <div className="flex items-center gap-3">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/footer/x.png" alt="Twitter" className="h-5 w-5 hover:opacity-80" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/footer/fb.png" alt="Facebook" className="h-5 w-5 hover:opacity-80" />
                </a>
                <a href="https://instagram.com/hakimm.png" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/footer/ig.png" alt="Instagram" className="h-5 w-5 hover:opacity-80" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/footer/yt.png" alt="YouTube" className="h-5 w-5 hover:opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GARIS PEMBATAS */}
        <div className="hidden md:block w-px bg-gray-500"></div>

        {/* KANAN */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-end">
          <img src="/assets/footer/footer-walikota.png" alt="Wali Kota & Wakil" className="h-32 mb-3" />
          <button className="bg-white text-[#0D1A42] px-4 py-1.5 text-xs rounded-full flex items-center gap-2 hover:bg-gray-200">
            ▶️ Download Ragem
          </button>
          <p className="text-xs max-w-xs text-center md:text-right mt-3">
            Wujud komitmen Kota Serang untuk memberikan layanan terbaik kepada masyarakat Kota Serang dalam bentuk digital.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-[10px] text-gray-300">
        Copyright © 2025 Dinas Komunikasi, Informatika & Siswa PKL SMK Informatika. All Right Reserved
      </div>
    </footer>
  );
}
