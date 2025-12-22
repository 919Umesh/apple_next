"use client";

import { Sidebar } from "./sidebar/Sidebar";
import { TopBar } from "./topbar/TopBar";

interface LayoutWrapperProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function LayoutWrapper({ children, pageTitle }: LayoutWrapperProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}