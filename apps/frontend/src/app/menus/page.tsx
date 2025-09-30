"use client";

import { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";

export default function MenusPage() {
  const [menus, setMenus] = useState<any[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3001/menus")
      .then(res => res.json())
      .then(data => setMenus(data));
  }, []);

  const expandAll = () => {
    setExpandedKeys(menus.map(m => m.id)); // expand all ids
  };

  const collapseAll = () => {
    setExpandedKeys([]);
  };

  return (
    <div className="flex h-screen">
      {/* Tree View */}
      <div className="w-1/2 border-r p-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={expandAll}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Collapse All
          </button>
        </div>
        <Tree
          treeData={menus}
          expandedKeys={expandedKeys}
          onExpand={(keys) => setExpandedKeys(keys as string[])}
          onSelect={(_, e) => setSelectedMenu(e.node)}
        />

      </div>

      {/* Form */}
      <div className="w-1/2 p-6">
        {selectedMenu ? (
          <form className="space-y-4">
            <div>
              <label>Menu ID</label>
              <input
                value={selectedMenu.id}
                disabled
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Depth</label>
              <input
                value={selectedMenu.depth}
                disabled
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Parent Data</label>
              <input
                value={selectedMenu.parent || ""}
                disabled
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Name</label>
              <input
                defaultValue={selectedMenu.name}
                className="w-full border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white">Save</button>
          </form>
        ) : (
          <p>Select a menu item</p>
        )}
      </div>
    </div>
  );
}
