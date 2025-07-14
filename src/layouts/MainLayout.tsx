import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";

const MainLayout = () => {
  return (
    <main className="flex gap-3">
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
