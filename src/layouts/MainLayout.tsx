import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Header from "../components/shared/Header";

const MainLayout = () => {
  return (
    <main className="flex relative">
      <Sidebar />
      <div className="px-5 py-4 w-screen overflow-y-auto h-screen  rounded-2xl bg-background">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
