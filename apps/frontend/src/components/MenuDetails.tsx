// apps/frontend/src/components/MenuDetails.tsx
import React from 'react';
import { MenuItem } from '@/types/menu';

interface MenuDetailsProps {
  menu: MenuItem;
  onUpdate: (id: string, name: string) => void;
}

export const MenuDetails: React.FC<MenuDetailsProps> = ({ menu, onUpdate }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string).trim();

    if (name && name !== menu.name) {
      onUpdate(menu.id, name);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Menu ID">
          <input
            value={menu.id}
            disabled
            className="w-full bg-gray-50 border border-gray-300 rounded-[16px] px-4 py-[14px] text-gray-600"
          />
        </FormField>

        <FormField label="Depth">
          <input
            value={menu.depth}
            disabled
            className="w-full bg-gray-50 border border-gray-300 rounded-[16px] px-4 py-[14px] text-gray-600"
          />
        </FormField>

        <FormField label="Parent Data">
          <input
            value={menu.parent?.name || 'None'}
            disabled
            className="w-full bg-gray-50 border border-gray-300 rounded-[16px] px-4 py-[14px] text-gray-600"
          />
        </FormField>

        <FormField label="Name">
          <input
            name="name"
            defaultValue={menu.name}
            className="w-full border border-gray-300 rounded-[16px] px-4 py-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </FormField>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-[16px] font-medium hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {children}
  </div>
);