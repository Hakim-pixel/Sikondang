import { NextResponse } from 'next/server';

const dataPublikasi = [
  {
    id: 1,
    tahun: 2021,
    judul: 'BAGIAN DEPAN DISKOMINFO',
    image: '/assets/publikasi/p1.jpeg',
    tentang: 'Foto bagian depan kantor Diskominfo.',
    kategori: 'Diskominfo',
    abstrak: 'Publikasi ini berisi dokumentasi kegiatan Diskominfo pada tahun 2021.',
    lampiran: '/assets/publikasi/file1.pdf',
  },
  {
    id: 2,
    tahun: 2022,
    judul: 'DISKOMINFO AREA',
    image: '/assets/publikasi/p2.jpeg',
    tentang: 'Suasana area Diskominfo Kota Serang.',
    kategori: 'Diskominfo',
    abstrak: 'Publikasi tahun 2022 yang menampilkan suasana area Diskominfo.',
    lampiran: '/assets/publikasi/file2.pdf',
  },
  {
    id: 3,
    tahun: 2023,
    judul: 'RUANGAN E GOVERMENT',
    image: '/assets/publikasi/p3.jpeg',
    tentang: 'Ruangan E-Government untuk layanan digital.',
    kategori: 'Infografis Kecamatan',
    abstrak: 'Publikasi tahun 2023 mengenai ruangan E-Government Kota Serang.',
    lampiran: '/assets/publikasi/file3.pdf',
  },
];

export async function GET() {
  return NextResponse.json(dataPublikasi);
}
