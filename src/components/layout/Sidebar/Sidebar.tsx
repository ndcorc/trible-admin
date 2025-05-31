import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  Gift,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Rewards", href: "/rewards", icon: Gift },
  { name: "Bulletin", href: "/bulletin", icon: FileText },
  { name: "Account", href: "/account", icon: Settings },
];

interface SidebarProps {
  className?: string;
  onCollapseChange?: (width: number) => void; // new prop
}

export function Sidebar({ className = "", onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onCollapseChange) {
      onCollapseChange(newCollapsed ? 64 : 256);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0C434C] transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } ${className}`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-8 border-b border-sidebar-700 bg-[#578F9C]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-sidebar-800 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            </div>
          </div>
          {!isCollapsed && (
            <span className="text-3xl font-medium text-white">Trible</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-xl font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-sidebar-700 text-white"
                  : "text-sidebar-300 hover:bg-sidebar-700 hover:text-white"
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-2 space-y-2 border-t border-sidebar-700">
        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start text-sidebar-300 hover:bg-sidebar-700 hover:text-white ${
            isCollapsed ? "px-2" : ""
          }`}
          title={isCollapsed ? "Log out" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Log out</span>}
        </Button>

        {/* Toggle Button */}
        <div
          className={`flex justify-end w-full text-sidebar-300 ${isCollapsed ? "px-2" : ""}`}
        >
          <Button
            variant="ghost"
            onClick={toggleCollapse}
            className={`text-sidebar-300 hover:bg-sidebar-700 hover:text-white ${
              isCollapsed ? "px-2" : ""
            }`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 flex-shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 flex-shrink-0" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
