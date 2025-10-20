"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDatasetPage() {
  const router = useRouter();
  const [datasets, setDatasets] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    category: "",
    source: "",
    year: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Proteksi halaman admin (harus login Supabase)
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.replace("/login");
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [router]);

  // ✅ Ambil semua dataset dari Supabase
  const fetchDatasets = async () => {
    const { data, error } = await supabase
      .from("datasets")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Gagal memuat data dataset");
    } else {
      setDatasets(data || []);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  // ✅ Tambah atau Edit dataset
  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;
    if (isEditing) {
      result = await supabase
        .from("datasets")
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          source: formData.source,
          year: formData.year,
        })
        .eq("id", formData.id);
    } else {
      result = await supabase.from("datasets").insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          source: formData.source,
          year: formData.year,
        },
      ]);
    }

    if (result.error) {
      console.error(result.error);
      alert("❌ Gagal menyimpan dataset: " + result.error.message);
    } else {
      alert(isEditing ? "✅ Dataset berhasil diubah!" : "✅ Dataset berhasil ditambahkan!");
      setFormData({
        id: null,
        title: "",
        description: "",
        category: "",
        source: "",
        year: "",
      });
      setIsEditing(false);
      fetchDatasets();
    }
  };

  // ✅ Edit dataset
  const handleEdit = (data) => {
    setFormData(data);
    setIsEditing(true);
  };

  // ✅ Hapus dataset
  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus dataset ini?")) return;

    const { error } = await supabase.from("datasets").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("❌ Gagal menghapus dataset: " + error.message);
    } else {
      alert("🗑️ Dataset berhasil dihapus!");
      fetchDatasets();
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Jika belum login
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memuat halaman admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📊 Manajemen Dataset (Admin)
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            👋 Halo, <strong>{user.email}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Form Tambah/Edit */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <form
          onSubmit={handleSubmit}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg"
        >
          <input
            type="text"
            placeholder="Judul Dataset"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            placeholder="Kategori"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            placeholder="Sumber Data"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            placeholder="Tahun"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            placeholder="Deskripsi"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className="border p-2 rounded md:col-span-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            className={`${
              isEditing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 rounded-md md:col-span-2 shadow-sm transition`}
          >
            {isEditing ? "💾 Simpan Perubahan" : "➕ Tambah Dataset"}
          </button>
        </form>

        {/* Tabel Dataset */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2">Judul</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Sumber</th>
                <th className="border p-2">Tahun</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border p-2">{d.title}</td>
                  <td className="border p-2">{d.category}</td>
                  <td className="border p-2">{d.source}</td>
                  <td className="border p-2">{d.year}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEdit(d)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-2 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {datasets.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    Belum ada dataset.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
