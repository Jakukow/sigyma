import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar-cards";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-row h-full w-full">
          <AppSidebar />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
