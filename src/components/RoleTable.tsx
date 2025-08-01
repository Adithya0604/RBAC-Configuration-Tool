"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RoleTable() {
  const [roles, setRoles] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function fetchRoles() {
    const { data } = await supabase.from("roles").select("*");
    setRoles(data || []);
  }

  async function addRole() {
    if (!name) return;
    await supabase.from("roles").insert({ name });
    setName("");
    fetchRoles();
  }

  async function deleteRole(id: string) {
    await supabase.from("roles").delete().eq("id", id);
    fetchRoles();
  }

  useEffect(() => { fetchRoles(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          placeholder="New role name"
        />
        <button onClick={addRole} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul>
        {roles.map(role => (
          <li key={role.id} className="flex justify-between p-2 border-b">
            {role.name}
            <button onClick={() => deleteRole(role.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
