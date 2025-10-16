"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Username atau password salah.");
        return;
      }

      // Simpan session ke localStorage (sederhana, bisa pakai cookie juga)
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Redirect ke halaman admin/dataset
      router.push("/admin/dataset");

    } catch (err) {
      console.error(err);
      setError("Gagal menghubungi server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#005AA9] flex items-center justify-center px-8">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex overflow-hidden">
        <div className="w-full max-w-md p-10">
          <img
            src="/assets/kota-serang.png"
            alt="Logo Kota Serang"
            className="w-16 mb-6"
          />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Login</h1>
          <p className="text-yellow-500 font-semibold mb-6">
            SIKONDANG SATU DATA
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-[#005AA9] items-center justify-center p-8">
          <img
            src="/assets/hero-section.png"
            alt="Dashboard Illustration"
            className="max-w-full max-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
