export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/geospasial/shoot-serang.mp4" type="video/mp4" />
        Browser tidak mendukung tag video.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-4">TANGERANG SATU PETA</h1>
        <p className="max-w-xl mx-auto">
          Portal Geospasial Pemerintah Kota Serang.
        </p>
      </div>
    </section>
  );
}
