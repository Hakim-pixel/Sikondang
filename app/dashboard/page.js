"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [datasets, setDatasets] = useState([]);
  const [newDataset, setNewDataset] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    const res = await fetch("http://localhost:3000/datasets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDatasets(data);
  };

  const handleAdd = async () => {
    await fetch("http://localhost:3000/datasets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newDataset }),
    });
    setNewDataset("");
    fetchDatasets();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/datasets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchDatasets();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Dataset Management</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nama dataset"
          value={newDataset}
          onChange={(e) => setNewDataset(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </div>

      <ul className="space-y-2">
        {datasets.map((ds) => (
          <li key={ds.id} className="flex justify-between border p-2 rounded">
            <span>{ds.name}</span>
            <button
              onClick={() => handleDelete(ds.id)}
              className="text-red-600 hover:underline"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
