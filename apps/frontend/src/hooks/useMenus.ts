// apps/frontend/src/hooks/useMenus.ts
import { useState, useCallback } from 'react';
import { MenuItem } from '@/types/menu';

export const useMenus = () => {
  const [rawMenus, setRawMenus] = useState<MenuItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [isCreating, setIsCreating] = useState(false);
  const [newMenuParent, setNewMenuParent] = useState<MenuItem | null>(null);
  const [newMenuName, setNewMenuName] = useState('');

  const rootMenus = rawMenus.filter(menu => !menu.parentId);

  const getAllKeys = useCallback((nodes: MenuItem[]): string[] => {
    const keys: string[] = [];

    const walk = (items: MenuItem[]) => {
      items.forEach(item => {
        keys.push(item.id);
        if (item.children?.length) walk(item.children);
      });
    };

    walk(nodes);
    return keys;
  }, []);

  const expandAll = useCallback((nodes: MenuItem[]) => {
    setExpanded(new Set(getAllKeys(nodes)));
  }, [getAllKeys]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set());
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const startCreatingMenu = useCallback((parent: MenuItem | null = null) => {
    setNewMenuParent(parent);
    setIsCreating(true);
    setNewMenuName('');
  }, []);

  const cancelCreatingMenu = useCallback(() => {
    setIsCreating(false);
    setNewMenuParent(null);
    setNewMenuName('');
  }, []);

  return {
    // State
    rawMenus,
    selectedMenu,
    expanded,
    isCreating,
    newMenuParent,
    newMenuName,
    rootMenus,

    // Setters
    setRawMenus,
    setSelectedMenu,
    setNewMenuName,

    // Actions
    expandAll,
    collapseAll,
    toggleExpanded,
    startCreatingMenu,
    cancelCreatingMenu,
    getAllKeys,
  };
};