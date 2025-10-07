// apps/frontend/src/app/menus/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MenuTree } from '@/components/MenuTree';
import { MenuDetails } from '@/components/MenuDetails';
import { MenuCreationForm } from '@/components/MenuCreationForm';
import { useMenus } from '@/hooks/useMenus';
import { menuService } from '@/services/menuService';
import { MenuItem } from '@/types/menu';
import './treeStyles.css';

export default function MenusPage() {
  const [selectedRootMenu, setSelectedRootMenu] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const {
    rawMenus,
    selectedMenu,
    expanded,
    isCreating,
    newMenuParent,
    newMenuName,
    rootMenus,
    setRawMenus,
    setSelectedMenu,
    setNewMenuName,
    expandAll,
    collapseAll,
    toggleExpanded,
    startCreatingMenu,
    cancelCreatingMenu,
    getAllKeys,
  } = useMenus();

  // Fetch menus on component mount
  useEffect(() => {
    fetchMenus();
  }, []);

  // Auto-select first root menu if available
  useEffect(() => {
    if (rootMenus.length > 0 && !selectedRootMenu) {
      setSelectedRootMenu(rootMenus[0].id);
    }
  }, [rootMenus, selectedRootMenu]);

  const fetchMenus = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await menuService.fetchMenus();
      setRawMenus(data);
      expandAll(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menus');
      console.error('Failed to fetch menus:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTree = useMemo(() => {
    if (!selectedRootMenu) return rawMenus;

    const findNode = (nodes: MenuItem[]): MenuItem | null => {
      for (const node of nodes) {
        if (node.id === selectedRootMenu) return node;
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(rawMenus);
    return node ? [node] : [];
  }, [rawMenus, selectedRootMenu]);

  const handleCreateMenu = async () => {
    if (!newMenuName.trim()) return;

    try {
      const payload = {
        name: newMenuName.trim(),
        ...(newMenuParent && { parentId: newMenuParent.id }),
      };

      await menuService.createMenu(payload);
      cancelCreatingMenu();
      await fetchMenus(); // Refresh the tree
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create menu');
      console.error('Failed to create menu:', err);
    }
  };

  const handleUpdateMenu = async (id: string, name: string) => {
    try {
      await menuService.updateMenu(id, { name });
      await fetchMenus(); // Refresh the tree
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update menu');
      console.error('Failed to update menu:', err);
    }
  };

  const handleExpandAll = () => expandAll(filteredTree);

  if (isLoading) {
    return (
      <Sidebar headerTitle="Menus" headerBreadcrumbs={[{ label: 'Menus', href: '/menus' }]}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading menus...</div>
        </div>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar headerTitle="Menus" headerBreadcrumbs={[{ label: 'Menus', href: '/menus' }]}>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar headerTitle="Menus" headerBreadcrumbs={[{ label: 'Menus', href: '/menus' }]}>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left Panel - Tree View */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <MenuHeader
            selectedRootMenu={selectedRootMenu}
            rootMenus={rootMenus}
            onRootMenuChange={setSelectedRootMenu}
            onCreateRootMenu={() => startCreatingMenu()}
            onExpandAll={handleExpandAll}
            onCollapseAll={collapseAll}
          />

          <TreeContainer
            hasSelectedRoot={!!selectedRootMenu}
            treeContent={
              <MenuTree
                nodes={filteredTree}
                expanded={expanded}
                selectedMenu={selectedMenu}
                onToggle={toggleExpanded}
                onSelect={setSelectedMenu}
                onAddSubmenu={startCreatingMenu}
              />
            }
          />

          {isCreating && (
            <MenuCreationForm
              isRoot={!newMenuParent}
              parentName={newMenuParent?.name}
              menuName={newMenuName}
              onNameChange={setNewMenuName}
              onSubmit={handleCreateMenu}
              onCancel={cancelCreatingMenu}
            />
          )}
        </div>

        {/* Right Panel - Details */}
        <div className="w-full lg:w-1/2">
          {selectedMenu ? (
            <MenuDetails menu={selectedMenu} onUpdate={handleUpdateMenu} />
          ) : (
            <EmptyDetailsState />
          )}
        </div>
      </div>
    </Sidebar>
  );
}

// Supporting components for better organization
const MenuHeader: React.FC<{
  selectedRootMenu: string;
  rootMenus: MenuItem[];
  onRootMenuChange: (id: string) => void;
  onCreateRootMenu: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}> = ({ selectedRootMenu, rootMenus, onRootMenuChange, onCreateRootMenu, onExpandAll, onCollapseAll }) => (
  <div className="mb-6 space-y-4">
    <div>
      <label htmlFor="root-menu" className="block text-sm font-medium text-gray-700 mb-2">
        Menu
      </label>
      <div className="flex gap-4">
        <div className="flex-1">
          <select
            id="root-menu"
            value={selectedRootMenu}
            onChange={(e) => onRootMenuChange(e.target.value)}
            className="w-full h-[52px] rounded-[16px] bg-[#F9FAFB] border border-gray-300 px-4 py-[14px] pr-10 bg-no-repeat bg-[length:16px_16px] bg-[right_12px_center] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`
            }}
          >
            <option value="">Select a menu</option>
            {rootMenus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>
        {/* <button
          onClick={onCreateRootMenu}
          className="bg-green-600 text-white px-6 py-3 rounded-[48px] h-[52px] flex items-center justify-center whitespace-nowrap shrink-0 hover:bg-green-700 transition-colors"
        >
          + Root Menu
        </button> */}
      </div>
    </div>

    <div className="flex gap-2">
      <button
        onClick={onExpandAll}
        className="bg-[#1D2939] text-white px-4 py-3 rounded-[48px] flex-1 text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Expand All
      </button>
      <button
        onClick={onCollapseAll}
        className="border border-gray-300 px-4 py-3 rounded-[48px] flex-1 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        Collapse All
      </button>
    </div>
  </div>
);

const TreeContainer: React.FC<{ hasSelectedRoot: boolean; treeContent: React.ReactNode }> = ({
  hasSelectedRoot,
  treeContent,
}) => (
  <div className="flex-1">
    {hasSelectedRoot ? (
      <div className="border border-gray-200 rounded-2xl p-6 bg-white overflow-auto h-full">
        {treeContent}
      </div>
    ) : (
      <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
        Please select a menu from the dropdown above
      </div>
    )}
  </div>
);

const EmptyDetailsState: React.FC = () => (
  <div className="text-gray-500 flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 p-8 text-center">
    <div>
      <div className="text-lg font-medium mb-2">No Menu Selected</div>
      <div className="text-sm">Select a menu item to view details</div>
    </div>
  </div>
);