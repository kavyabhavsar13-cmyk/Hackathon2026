import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { Footer } from '@/components/layout/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';

export function AppLayout() {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}
