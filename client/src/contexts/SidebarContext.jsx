import { createContext, useContext, useEffect, useState } from 'react';

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebar-collapsed') === 'true');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  function toggleCollapsed() {
    setCollapsed((prev) => !prev);
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
