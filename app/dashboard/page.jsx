"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("datasets").select("*");
      setDatasets(data || []);
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Dataset</h1>
        <Button asChild><Link href="/dashboard/tambah">Tambah Dataset</Link></Button>
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Judul</th>
            <th className="p-2">Kategori</th>
            <th className="p-2">Format</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((d) => (
            <tr key={d.id} className="border-b">
              <td className="p-2">{d.title}</td>
              <td className="p-2">{d.category}</td>
              <td className="p-2">{(d.format || []).join(", ")}</td>
              <td className="p-2">
                <Link href={`/dashboard/edit/${d.id}`} className="text-blue-600 hover:underline">Edit</Link>{" "}
                |{" "}
                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    await supabase.from("datasets").delete().eq("id", d.id);
                    setDatasets(datasets.filter((x) => x.id !== d.id));
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
