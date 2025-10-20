import { supabase } from "@/lib/supabaseClient";

// GET semua dataset
export async function GET() {
  const { data, error } = await supabase.from("datasets").select("*").order("id", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

// POST tambah dataset baru
export async function POST(req) {
  const body = await req.json();
  const { data, error } = await supabase
    .from("datasets")
    .insert([
      {
        title: body.title || "Tanpa Judul",
        description: body.description || "",
        category: body.category || "Tanpa Kategori",
        format: body.format || ["CSV"],
      },
    ])
    .select();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data[0]);
}

// PUT update dataset
export async function PUT(req) {
  const body = await req.json();
  const { data, error } = await supabase
    .from("datasets")
    .update({
      title: body.title,
      description: body.description,
      category: body.category,
      format: body.format,
    })
    .eq("id", body.id)
    .select();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data[0]);
}

// DELETE hapus dataset
export async function DELETE(req) {
  const { id } = await req.json();
  const { error } = await supabase.from("datasets").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ message: "Dataset dihapus" });
}
