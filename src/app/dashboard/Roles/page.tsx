"use client";
import RoleTable from "../../../components/RoleTable";

export default function RolesPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Roles Management</h1>
      <RoleTable />
    </div>
  );
}
