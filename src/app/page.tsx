"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = "/dashboard";
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-6 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold">Admin Login</h2>
        <input className="border p-2 w-full" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}
