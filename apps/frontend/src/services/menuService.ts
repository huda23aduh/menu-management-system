const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function fetchMenus() {
  const res = await fetch(`${API_URL}/menus`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch menus");
  return res.json();
}

export async function createMenu(data: { name: string; parentId?: string }) {
  const res = await fetch(`${API_URL}/menus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create menu");
  return res.json();
}
