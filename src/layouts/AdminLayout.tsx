import { type ReactNode, useState, useEffect } from "react";
import { Sidebar, AppBar } from "@/components/layout";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(256); // 64px when collapsed, 256px when expanded

  // Listen to sidebar state changes (this is a simplified approach)
  // In a real implementation, you might want to use a context or state management
  useEffect(() => {
    const handleResize = () => {
      // This is a placeholder - in reality you'd get this from the Sidebar component state
      // For now, we'll use a default value
      setSidebarWidth(256);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onCollapseChange={setSidebarWidth} />

      {/* AppBar */}
      <AppBar sidebarWidth={sidebarWidth} />

      {/* Main content */}
      <main
        className="transition-all duration-300 pt-16"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>
    </div>
  );
}
