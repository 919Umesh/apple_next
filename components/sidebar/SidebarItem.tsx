"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {
  label: string;
  href: string;
  icon: any;
};

export function SidebarItem({ label, href, icon: Icon }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition",
        isActive
          ? "bg-emerald-600 text-white"
          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
      )}
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}