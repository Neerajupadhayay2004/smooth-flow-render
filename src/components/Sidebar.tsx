
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
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen transition-all duration-300 z-40",
        // Desktop and tablet sizing
        isCollapsed ? "w-16" : "w-64",
        // Mobile positioning
        "fixed lg:relative",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">M</span>
            </div>
            {!isCollapsed && (
              <span className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 dark:text-white">MUN-C</span>
            )}
          </div>
        </div>

        {/* Collapse Button - Hidden on Mobile and Tablet */}
        <div className="hidden xl:block absolute -right-3 top-24">
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
        <nav className="p-2 sm:p-3 lg:p-4 space-y-1 sm:space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-medium text-xs sm:text-sm lg:text-base h-8 sm:h-9 lg:h-10",
                  isActivePath(item.path) && "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
                  isCollapsed ? "px-1 sm:px-2" : "px-2 sm:px-3"
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
                <item.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.hasSubmenu && (
                      inventoryOpen ? 
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-auto flex-shrink-0" /> : 
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-auto flex-shrink-0" />
                    )}
                  </>
                )}
              </Button>
              
              {item.hasSubmenu && inventoryOpen && !isCollapsed && (
                <div className="ml-5 sm:ml-7 mt-1 sm:mt-2 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <Button
                      key={subItem.label}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-xs sm:text-sm h-7 sm:h-8",
                        location.pathname === subItem.path && "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                      )}
                      onClick={() => {
                        navigate(subItem.path);
                        setIsMobileOpen(false);
                      }}
                    >
                      <span className="truncate">{subItem.label}</span>
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
