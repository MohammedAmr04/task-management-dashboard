import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  LineChartOutlined,
  HistoryOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/dashboard",
    className: "text-xl text-center mb-7 ",
  },
  {
    key: "analytics",
    icon: <LineChartOutlined />,
    label: "Analytics",
    path: "/analytics",
    className: "text-xl mb-7 ",
  },
  {
    key: "history",
    icon: <HistoryOutlined />,
    label: "History",
    path: "/history",
    className: "text-xl mb-7 ",
  },
  {
    key: "todo",
    icon: <CheckSquareOutlined />,
    label: "To-do",
    path: "/todo",
    className: "text-xl mb-7",
  },
  {
    key: "report",
    icon: <FileTextOutlined />,
    label: "Report",
    path: "/report",
    className: "text-xl mb-7",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    path: "/settings",
    className: "text-xl mb-7",
  },
];
interface ClickEvent {
  key: string;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClick = (e: ClickEvent) => {
    const item = items.find((i) => i.key === e.key);
    if (item && item.path) {
      navigate(item.path);
    }
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={256}
      theme="light"
      className="py-2 bg-white"
    >
      <div
        className={`h-8 m-4 flex  uppercase items-center font-bold justify-center ${
          collapsed ? "text-xl" : "text-4xl"
        } `}
      >
        Task
        <span className="text-primary normal-case">.ai</span>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        onClick={onClick}
        className="h-screen "
      />
    </Sider>
  );
};

export default Sidebar;
