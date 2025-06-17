
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  RotateCcw, 
  BarChart,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", hasSubmenu: false },
    { 
      icon: Package, 
      label: "Inventory", 
      path: "/", 
      hasSubmenu: true,
      submenu: [
        { label: "Add Product", path: "/add-product" },
        { label: "Dashboard", path: "/" },
      ]
    },
    { icon: ShoppingCart, label: "Stocks", path: "/stocks", hasSubmenu: false },
    { icon: ShoppingCart, label: "Sales", path: "/sales", hasSubmenu: false },
    { icon: FileText, label: "Documents", path: "/documents", hasSubmenu: false },
    { icon: RotateCcw, label: "Return & Audit", path: "/return-audit", hasSubmenu: false },
    { icon: BarChart, label: "Report", path: "/report", hasSubmenu: false },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-xl text-gray-900">MUN-C</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-medium",
                isActivePath(item.path) && "bg-blue-50 text-blue-600"
              )}
              onClick={() => {
                if (item.hasSubmenu && item.label === "Inventory") {
                  setInventoryOpen(!inventoryOpen);
                } else {
                  navigate(item.path);
                }
              }}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
              {item.hasSubmenu && (
                inventoryOpen ? 
                <ChevronDown className="w-4 h-4 ml-auto" /> : 
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </Button>
            
            {item.hasSubmenu && inventoryOpen && (
              <div className="ml-7 mt-2 space-y-1">
                {item.submenu?.map((subItem) => (
                  <Button
                    key={subItem.label}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full justify-start text-sm",
                      location.pathname === subItem.path && "bg-blue-50 text-blue-600"
                    )}
                    onClick={() => navigate(subItem.path)}
                  >
                    {subItem.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
