// apps/frontend/src/services/menuService.ts
import { MenuItem } from '@/types/menu';

const API_BASE_URL = 'http://localhost:3001';

export const menuService = {
  async fetchMenus(): Promise<MenuItem[]> {
    const response = await fetch(`${API_BASE_URL}/menus`);
    if (!response.ok) throw new Error('Failed to fetch menus');
    return response.json();
  },

  async createMenu(payload: { name: string; parentId?: string }): Promise<MenuItem> {
    const response = await fetch(`${API_BASE_URL}/menus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create menu');
    return response.json();
  },

  async updateMenu(id: string, payload: { name: string }): Promise<MenuItem> {
    const response = await fetch(`${API_BASE_URL}/menus/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to update menu');
    return response.json();
  },
};