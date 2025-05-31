import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks";

interface AppBarProps {
  sidebarWidth: number;
}

export function AppBar({ sidebarWidth }: AppBarProps) {
  const { user } = useAuth();

  return (
    <div
      className="fixed top-0 right-0 z-40 h-16 bg-white border-b border-gray-200 transition-all duration-300"
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.displayName || user?.email || "Main Street Brew"}
              </p>
              <p className="text-xs text-gray-500">Obsidian Membership</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.displayName?.[0] || user?.email?.[0] || "M"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
