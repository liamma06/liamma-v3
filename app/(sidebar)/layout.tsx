import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <MobileNav />
      {/* marginLeft aligns the content area center (not sidebar+content center) with 50vw.
          38rem = sidebar (14rem) + half of content area (24rem of 48rem total) */}
      <div
        className="flex w-full max-w-[62rem]"
        style={{ marginLeft: "max(0px, calc(50vw - 38rem))" }}
      >
        <Sidebar />
        <main className="flex-1 px-4 py-6 pt-16 md:px-10 md:py-10 md:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}
