
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Settings, Bell, User, LogOut, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import NotificationPanel from "./NotificationPanel";
import SettingsPanel from "./SettingsPanel";

interface HeaderProps {
  title?: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

const Header = ({ title = "Dashboard", showAddButton = true, onAddClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleAddProduct = () => {
    if (onAddClick) {
      onAddClick();
    } else {
      navigate("/add-product");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0 flex-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-md font-bold text-sm sm:text-base lg:text-lg">
              MUN-C
            </div>
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">
              {title}
            </h1>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-sm"
            />
          </div>
        </div>

        {/* Right Side - Actions and Profile */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          {showAddButton && (
            <Button 
              onClick={handleAddProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white h-8 sm:h-9 lg:h-10 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Product</span>
            </Button>
          )}

          {/* Mobile Search Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9"
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowSettings(false);
              }}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <NotificationPanel 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
            />
          </div>

          {/* Settings */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
              onClick={() => {
                setShowSettings(!showSettings);
                setShowNotifications(false);
              }}
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <SettingsPanel 
              isOpen={showSettings} 
              onClose={() => setShowSettings(false)} 
            />
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full">
                <Avatar className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-xs sm:text-sm">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 sm:w-56 bg-white dark:bg-gray-800" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowSettings(!showSettings)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
