import { Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks";
import { useEffect, useRef, useState } from "react";

interface AppBarProps {
  sidebarWidth: number;
}

export function AppBar({ sidebarWidth }: AppBarProps) {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Optional: Add handlers for clicking each dropdown item
  const handleDummy = () => {
    // Handle Dummy item click...
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    // Handle Log out click...
    setDropdownOpen(false);
  };

  return (
    <div
      className="fixed top-0 right-0 z-40 h-16 bg-surface border-b border-gray-200 transition-all duration-300"
      style={{ left: `${sidebarWidth}px` }}
    >
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Search */}
        <div className="flex items-center max-w-lg flex-1">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* User menu */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName || user?.email || "Main Street Brew"}
                </p>
                <p className="text-xs text-gray-500">Obsidian Membership</p>
              </div>
              <div className="h-8 w-8 cursor-pointer rounded-full bg-tertiary flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.displayName?.[0] || user?.email?.[0] || "M"}
                </span>
              </div>
            </div>
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-md bg-surface shadow-lg ring-1 ring-surface-dim ring-opacity-5">
              <div className="py-1">
                <span
                  className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-surface-container"
                  onClick={handleDummy}
                >
                  Dummy
                </span>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`w-full justify-start text-sidebar-300 hover:bg-surface-container`}
                  title={"Log out"}
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3">Log out</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
