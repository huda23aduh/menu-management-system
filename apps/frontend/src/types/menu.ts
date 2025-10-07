export interface MenuItem {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  createdAt?: string;
  updatedAt?: string;
  children?: MenuItem[];
  parent?: {
    id: string;
    name: string;
  } | null;
}

export interface Breadcrumb {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}