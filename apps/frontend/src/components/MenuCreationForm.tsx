// apps/frontend/src/components/MenuCreationForm.tsx
import React from 'react';

interface MenuCreationFormProps {
  isRoot: boolean;
  parentName?: string;
  menuName: string;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const MenuCreationForm: React.FC<MenuCreationFormProps> = ({
  isRoot,
  parentName,
  menuName,
  onNameChange,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex gap-2 p-4 bg-gray-50 rounded-2xl"
    >
      <input
        value={menuName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={
          isRoot
            ? 'New root menu name'
            : `New submenu for ${parentName}`
        }
        className="border border-gray-300 px-4 py-3 rounded-[16px] flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        type="submit"
        disabled={!menuName.trim()}
        className="bg-green-600 text-white px-6 py-3 rounded-[16px] font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-[16px] font-medium hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
    </form>
  );
};