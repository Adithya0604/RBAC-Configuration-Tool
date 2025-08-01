"use client";
import PermissionTable from "../../../components/PermissionTable";

export default function PermissionsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Permissions Management</h1>
      <PermissionTable />
    </div>
  );
}
