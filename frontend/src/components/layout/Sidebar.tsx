"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Quote, 
  CheckCircle, 
  ShoppingCart, 
  Receipt, 
  BarChart3, 
  Activity,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Vendors", href: "/vendors" },
  { icon: FileText, label: "RFQs", href: "/rfqs" },
  { icon: Quote, label: "Quotations", href: "/quotations" },
  { icon: CheckCircle, label: "Approvals", href: "/approvals" },
  { icon: ShoppingCart, label: "Purchase Orders", href: "/purchase-orders" },
  { icon: Receipt, label: "Invoices", href: "/invoices" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Activity, label: "Activity", href: "/activity" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          V
        </div>
        <span className="font-bold text-xl text-gray-900 tracking-tight">VendorBridge</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            PO
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">Procurement Officer</p>
            <p className="text-xs text-gray-500 truncate">po@vendorbridge.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
