let datasets = [
  {
    id: 1,
    title: "Dataset tanpa judul",
    description: "Informasi kependudukan kota Serang",
    category: "Tanpa Kategori",
    format: ["CSV"],
    downloads: 0,
    lastUpdate: "-",
  },
];

// GET semua dataset
export async function GET() {
  return Response.json(datasets);
}

// POST tambah dataset baru
export async function POST(req) {
  const body = await req.json();
  const newDataset = {
    id: Date.now(),
    title: body.title || "Tanpa Judul",
    description: body.description || "",
    category: body.category || "Tanpa Kategori",
    format: body.format || ["CSV"],
    downloads: 0,
    lastUpdate: new Date().toLocaleDateString("id-ID"),
  };
  datasets.push(newDataset);
  return Response.json(newDataset);
}

// PUT update dataset
export async function PUT(req) {
  const body = await req.json();
  const index = datasets.findIndex((d) => d.id === body.id);
  if (index === -1) {
    return new Response(JSON.stringify({ error: "Dataset tidak ditemukan" }), { status: 404 });
  }
  datasets[index] = { ...datasets[index], ...body, lastUpdate: new Date().toLocaleDateString("id-ID") };
  return Response.json(datasets[index]);
}

// DELETE hapus dataset
export async function DELETE(req) {
  const { id } = await req.json();
  datasets = datasets.filter((d) => d.id !== id);
  return Response.json({ message: "Dataset dihapus" });
}
