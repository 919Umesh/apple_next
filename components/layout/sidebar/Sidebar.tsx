"use client";

import { sidebarItems } from "./sidebar.config";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Basantpur Bhada Pasal</h1>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}