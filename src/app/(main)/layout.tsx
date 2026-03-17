import { Header, Sidebar } from "@/components/navigation";

export default function MainLayout({children}:{children: React.ReactNode}) {
  return (
   <div className="flex h-screen overflow-hidden bg-page-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header  />
        <main className="flex-1 overflow-y-auto bg-page-bg scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}