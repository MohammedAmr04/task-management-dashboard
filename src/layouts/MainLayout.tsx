import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Header from "../components/shared/Header";

const MainLayout = () => {
  return (
    <main className="flex ">
      <Sidebar />
      <div className="px-5 pt-4 w-screen   rounded-2xl bg-background">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
