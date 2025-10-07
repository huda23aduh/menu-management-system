import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu, Prisma } from '@prisma/client';

type MenuWithChildren = Menu & { children: MenuWithChildren[] };

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const flat = await this.prisma.menu.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        parent: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });
    return buildTree(flat);
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async create(dto: { name: string; parentId?: string }) {
    const parent = dto.parentId
      ? await this.prisma.menu.findUnique({ where: { id: dto.parentId } })
      : null;

    const depth = parent ? parent.depth + 1 : 0;

    return this.prisma.menu.create({
      data: {
        name: dto.name,
        parentId: dto.parentId ?? null,
        depth
      },
    });
  }

  async update(id: string, dto: Prisma.MenuUpdateInput) {
    return this.prisma.menu.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: string) {
    // simple cascade: delete item and its children recursively or implement business rule
    return this.prisma.menu.delete({ where: { id } });
  }
}

// helper
function buildTree(items: any[]): MenuWithChildren[] {
  const map = new Map<string, MenuWithChildren>();
  const roots: MenuWithChildren[] = [];

  // Create map entries - now includes parent data from Prisma
  items.forEach(item => {
    map.set(item.id, {
      ...item,
      children: [],
      parent: item.parent ? { id: item.parent.id, name: item.parent.name } : null
    });
  });

  // Build tree structure - this part remains exactly the same
  for (const item of Array.from(map.values())) {
    if (item.parentId && map.has(item.parentId)) {
      const parent = map.get(item.parentId);
      parent?.children.push(item);
    } else {
      roots.push(item);
    }
  }

  return roots;
}