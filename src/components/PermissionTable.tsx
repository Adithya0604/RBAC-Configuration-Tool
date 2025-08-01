"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PermissionTable() {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function fetchPermissions() {
    const { data, error } = await supabase.from("permissions").select("*");
    if (error) console.error(error);
    setPermissions(data || []);
  }

  async function addPermission() {
    if (!name) return;
    await supabase.from("permissions").insert({ name, description });
    setName("");
    setDescription("");
    fetchPermissions();
  }

  async function deletePermission(id: string) {
    await supabase.from("permissions").delete().eq("id", id);
    fetchPermissions();
  }

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          placeholder="Permission name"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
          placeholder="Description"
        />
        <button
          onClick={addPermission}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {permissions.map((perm) => (
          <li key={perm.id} className="flex justify-between p-2 border-b">
            {perm.name} — {perm.description || "No description"}
            <button
              onClick={() => deletePermission(perm.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
