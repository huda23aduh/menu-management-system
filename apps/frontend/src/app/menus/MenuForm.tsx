// apps/frontend/src/app/menus/MenuForm.tsx
"use client";

import { useState } from "react";
import { createMenu } from "@/services/menuService";

export default function MenuForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name) return;
    setLoading(true);

    try {
      await createMenu({ name });
      setName("");

      // ✅ refresh server data after adding
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to create menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Menu name"
        className="border p-2 mr-2"
      />
      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Menu"}
      </button>
    </div>
  );
}
