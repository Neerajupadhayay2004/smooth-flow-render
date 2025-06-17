
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
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
        { label: "Products", path: "/" },
      ]
    },
    { icon: ShoppingCart, label: "Stocks", path: "/stocks", hasSubmenu: false },
    { icon: ShoppingCart, label: "Sales", path: "/sales", hasSubmenu: false },
    { icon: FileText, label: "Documents", path: "/documents", hasSubmenu: false },
    { icon: RotateCcw, label: "Return & Audit", path: "/return-audit", hasSubmenu: false },
    { icon: BarChart, label: "Reports", path: "/reports", hasSubmenu: false },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64",
        "fixed md:relative",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">MUN-C</span>
            )}
          </div>
        </div>

        {/* Collapse Button - Hidden on Mobile */}
        <div className="hidden md:block absolute -right-3 top-24">
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 rounded-full bg-white dark:bg-gray-800"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRight className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-3 md:p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-medium text-sm md:text-base",
                  isActivePath(item.path) && "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
                  isCollapsed && "px-2"
                )}
                onClick={() => {
                  if (item.hasSubmenu && item.label === "Inventory") {
                    setInventoryOpen(!inventoryOpen);
                  } else {
                    navigate(item.path);
                    setIsMobileOpen(false);
                  }
                }}
              >
                <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    {item.label}
                    {item.hasSubmenu && (
                      inventoryOpen ? 
                      <ChevronDown className="w-4 h-4 ml-auto" /> : 
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </>
                )}
              </Button>
              
              {item.hasSubmenu && inventoryOpen && !isCollapsed && (
                <div className="ml-7 mt-2 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <Button
                      key={subItem.label}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm",
                        location.pathname === subItem.path && "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                      )}
                      onClick={() => {
                        navigate(subItem.path);
                        setIsMobileOpen(false);
                      }}
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
    </>
  );
};

export default Sidebar;
