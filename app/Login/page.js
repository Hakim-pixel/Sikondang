"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    // 🔥 Login via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setError("Email atau password salah.");
      return;
    }

    // ✅ Simpan session ke localStorage
    localStorage.setItem("supabaseSession", JSON.stringify(data.session));

    // 🔁 Redirect ke dashboard admin
    router.push("/admin/dataset");
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
