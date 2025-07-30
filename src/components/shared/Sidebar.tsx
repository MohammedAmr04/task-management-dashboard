import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdInsertChart,
  MdHistory,
  MdChecklist,
  MdDescription,
  MdSettings,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { Spin } from "antd";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <MdDashboard />,
    path: "/dashboard",
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: <MdInsertChart />,
    path: "/analytics",
  },
  { key: "history", label: "History", icon: <MdHistory />, path: "/history" },
  { key: "todo", label: "To-do", icon: <MdChecklist />, path: "/todo" },
  { key: "report", label: "Report", icon: <MdDescription />, path: "/report" },
  {
    key: "settings",
    label: "Settings",
    icon: <MdSettings />,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  const handleClick = (path: string) => {
    navigate(path);
    setIsMobileOpen(false); // close sidebar on mobile after click
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false); // hide mobile menu on larger screens
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-5 text-3xl p-4"
        onClick={() => setIsMobileOpen(true)}
      >
        <MdMenu />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-card shadow-md transition-all duration-300 flex flex-col md:sticky fixed top-0 h-screen z-50
        ${collapsed ? "w-20" : "w-64"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:flex 
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between ${
            collapsed ? "py-4" : "p-4"
          } border-b border-border`}
        >
          <h1
            className={`uppercase font-bold transition-all duration-300 ${
              collapsed ? "text-xl mx-auto" : "text-3xl mx-auto"
            }`}
          >
            Task<span className="text-primary normal-case">.ai</span>
          </h1>

          {/* Close Button on Mobile */}
          <button
            className="md:hidden text-2xl absolute top-4 right-4"
            onClick={() => setIsMobileOpen(false)}
          >
            <MdClose />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 relative">
          {error && (
            <p className="text-danger text-center mt-4">{error.message}</p>
          )}
          {!error && isLoading && (
            <div className="flex items-center justify-center my-4">
              <Spin size="small" />
            </div>
          )}
          {!error && !isLoading && isAuthenticated && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 px-1 md:px-3 mb-4 text-center">
              <img
                src={user?.picture}
                alt={user?.name}
                className="rounded-full size-6 inline-block"
              />
              <span>{user?.name}</span>
            </div>
          )}
          <div className="mx-0 md:mx-4 px-1 md:px-3">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
          {items.map((item) => (
            <div
              key={item.key}
              className={`flex items-center ${
                collapsed ? "py-3 ps-2.5 justify-center" : "p-3 ps-9"
              } mb-2 border-l-3 border-transparent hover:border-primary rounded-lg hover:bg-tag-bg-danger hover:text-primary cursor-pointer transition-all`}
              onClick={() => handleClick(item.path)}
            >
              <span className="text-xl me-4">{item.icon}</span>
              {!collapsed && (
                <span className="text-xl font-medium">{item.label}</span>
              )}
            </div>
          ))}
          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-2xl py-3 mb-2 px-0 absolute start-[50%] translate-x-[-50%] cursor-pointer transition-all hidden md:block"
          >
            {collapsed ? <MdMenu /> : <MdClose />}
          </button>
        </nav>
      </aside>

      {/* Background Overlay when Sidebar is open on mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0   bg-text bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
