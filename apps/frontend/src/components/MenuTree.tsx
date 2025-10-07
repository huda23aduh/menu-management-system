// apps/frontend/src/components/MenuTree.tsx
import React from 'react';
import { MenuItem } from '@/types/menu';
import ChevronDown from '@/app/assets/chevron-down.svg';

interface MenuTreeProps {
  nodes: MenuItem[];
  expanded: Set<string>;
  selectedMenu: MenuItem | null;
  onToggle: (id: string) => void;
  onSelect: (menu: MenuItem) => void;
  onAddSubmenu: (parent: MenuItem) => void;
}

export const MenuTree: React.FC<MenuTreeProps> = ({
  nodes,
  expanded,
  selectedMenu,
  onToggle,
  onSelect,
  onAddSubmenu,
}) => {
  return (
    <ul className="custom-tree">
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;
        const isExpanded = expanded.has(node.id);
        const hasChildren = !!node.children?.length;
        const isSelected = selectedMenu?.id === node.id;

        return (
          <li key={node.id} className={isLast ? 'is-last' : ''}>
            <div
              className={`node-row ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(node)}
              onDoubleClick={() => hasChildren && onToggle(node.id)}
              title={node.name}
            >
              <div className="node-left">
                {hasChildren ? (
                  <button
                    className={`caret-btn ${isExpanded ? 'expanded' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(node.id);
                    }}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <ChevronDown className="caret-icon" />
                  </button>
                ) : (
                  <span className="caret-placeholder" />
                )}
              </div>

              <div className="node-title">
                <span className="node-label">{node.name}</span>
              </div>

              <div className="node-actions">
                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddSubmenu(node);
                  }}
                  aria-label="Add submenu"
                >
                  +
                </button>
              </div>
            </div>

            {hasChildren && isExpanded && (
              <div className="node-children">
                <MenuTree
                  nodes={node.children!}
                  expanded={expanded}
                  selectedMenu={selectedMenu}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  onAddSubmenu={onAddSubmenu}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};