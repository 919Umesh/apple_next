import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  Wallet,
  BarChart3,
  HelpCircle,
  AlertTriangle,
  Headphones,
  LogOut,
  Home,
} from "lucide-react";

export const sidebarItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Order Management",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Product Management",
    href: "/products",
    icon: Package,
  },
  {
    label: "Deals & Discounts",
    href: "/deals",
    icon: Tag,
  },
  {
    label: "Payout",
    href: "/payout",
    icon: Wallet,
  },
  {
    label: "Analytics & Reports",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Queries",
    href: "/queries",
    icon: HelpCircle,
  },
  {
    label: "Issues",
    href: "/issues",
    icon: AlertTriangle,
  },
  {
    label: "Customer Support",
    href: "/support",
    icon: Headphones,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];