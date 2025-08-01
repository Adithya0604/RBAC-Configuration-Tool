"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RolePermissionLink() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  async function fetchData() {
    const { data: rolesData } = await supabase.from("roles").select("*");
    const { data: permData } = await supabase.from("permissions").select("*");
    setRoles(rolesData || []);
    setPermissions(permData || []);
  }

  async function saveLinks() {
    if (!selectedRole) return;
    // Remove old links
    await supabase.from("role_permissions").delete().eq("role_id", selectedRole);
    // Insert new links
    const rows = selectedPermissions.map(pid => ({
      role_id: selectedRole,
      permission_id: pid,
    }));
    if (rows.length) await supabase.from("role_permissions").insert(rows);
    alert("Links updated!");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <select
        className="border p-2"
        onChange={(e) => setSelectedRole(e.target.value)}
        value={selectedRole}
      >
        <option value="">Select Role</option>
        {roles.map(role => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <div className="space-y-2">
        {permissions.map(perm => (
          <label key={perm.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedPermissions.includes(perm.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedPermissions(prev =>
                  checked ? [...prev, perm.id] : prev.filter(id => id !== perm.id)
                );
              }}
            />
            <span>{perm.name}</span>
          </label>
        ))}
      </div>

      <button
        onClick={saveLinks}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Links
      </button>
    </div>
  );
}
