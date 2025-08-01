"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = "/";
      else setUser(data.user);
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">RBAC Admin Dashboard</h1>
      <div className="flex space-x-4">
        <Link href="/dashboard/Roles" className="bg-gray-200 px-4 py-2 rounded">Manage Roles</Link>
        <Link href="/dashboard/Permissions" className="bg-gray-200 px-4 py-2 rounded">Manage Permissions</Link>
        <Link href="/dashboard/link" className="bg-gray-200 px-4 py-2 rounded">Link Roles & Permissions</Link>
      </div>
    </div>
  );
}
