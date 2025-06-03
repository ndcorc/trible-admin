import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  Gift,
  FileText,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import { BasicButton } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks";
import tribleLogo from "@/assets/images/trible-logo.png";

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
      onCollapseChange(newCollapsed ? 100 : 256);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-surface transition-all duration-300 border-r-1 border-surface-dim ${
        isCollapsed ? "w-[100px]" : "w-[256px]"
      } ${className}`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-b-surface-dim">
        <div className="flex items-center space-x-3">
          <div className="h-10 rounded-lg flex items-center justify-center">
            <div className="w-11 h-10 bg-sidebar-800 rounded-sm flex items-center justify-center">
              <img className="w-full h-10 rounded-full" src={tribleLogo} />
            </div>
          </div>
          {!isCollapsed && (
            <span className="text-4xl font-medium text-on-surface">Trible</span>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-2 py-4 space-y-2">
        {/* Toggle Button */}
        <div
          className={`flex ${isCollapsed ? "justify-center" : "justify-end"} w-full`}
        >
          <BasicButton
            variant="ghost"
            onClick={toggleCollapse}
            className="px-6 py-2.5 text-on-surface cursor-pointer hover:bg-surface-container focus:ring-0 focus:ring-offset-0 focus:ring-transparent rounded-3xl"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-6.5 w-6.5 flex-shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="h-6.5 w-6.5 flex-shrink-0" />
              </>
            )}
          </BasicButton>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <div className="flex flex-col justify-center h-full space-y-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-6 py-2.5 text-xl leading-[1] font-medium rounded-3xl transition-colors ${
                  isActive
                    ? "bg-secondary-container"
                    : "text-sidebar-300 hover:bg-surface-container"
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="h-6.5 w-6.5 flex-shrink-0 ml-1" />
                {!isCollapsed && <span className="mx-5">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 mt-18">
        {/* Toggle Button */}
        <div className={`flex flex-col justify-center h-full space-y-6`}>
          <BasicButton
            variant="ghost"
            onClick={handleLogout}
            className={`justify-start px-6 py-2.5 text-on-surface cursor-pointer text-xl hover:bg-surface-container focus:ring-0 focus:ring-offset-0 focus:ring-transparent rounded-3xl overflow-x-hidden`}
            title={isCollapsed ? "Log out" : undefined}
          >
            <LogOut className="h-6.5 w-6.5 flex-shrink-0 ml-1" />
            {!isCollapsed && (
              <span className="mx-5 overflow-x-hidden line-clamp-1">
                Log out
              </span>
            )}
          </BasicButton>
        </div>
      </div>
    </div>
  );
}
