import { Header } from "@/components/navbar/header";
import { AppSidebar } from "@/components/sidebar/sidebar-cards";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex flex-col  ">
        <Header />
        <div className="flex flex-row h-full ">
          <AppSidebar />
          <main className="w-full   flex ">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
