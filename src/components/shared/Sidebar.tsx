import { useState } from "react";
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
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={`h-screen bg-card sticky top-0 shadow-md transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      <div
        className={`flex items-center justify-between ${
          collapsed ? "py-4" : "p-4"
        }  border-b border-border`}
      >
        <h1
          className={`uppercase font-bold transition-all duration-300 ${
            collapsed ? "text-xl mx-auto" : "text-3xl mx-auto"
          }`}
        >
          Task<span className="text-primary normal-case">.ai</span>
        </h1>
      </div>

      <nav className="flex-1 p-2 space-y-1 relative">
        {items.map((item) => (
          <div
            key={item.key}
            // className={`flex items-center p-3 mb-2 ${
            //   collapsed ? "justify-center pl-6.5" : "ps-9 "
            // } rounded-lg hover:bg-primary hover:text-card cursor-pointer transition-all`}
            className={`flex items-center   ${
              collapsed ? "py-3 ps-2.5 justify-center" : "p-3 ps-9"
            }  mb-2 border-l-3 border-transparent hover:border-primary   rounded-lg hover:bg-tag-bg-danger hover:text-primary cursor-pointer transition-all`}
            onClick={() => handleClick(item.path)}
          >
            <span className="text-xl me-4">{item.icon}</span>
            {!collapsed && (
              <span className="text-xl font-medium">{item.label}</span>
            )}
          </div>
        ))}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className=" text-2xl py-3 mb-2 px-0 absolute start-[50%] translate-x-[-50%]  cursor-pointer transition-all"
        >
          {collapsed ? <MdMenu /> : <MdClose />}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
