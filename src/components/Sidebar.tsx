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
    label: (
      <div className="text-xl flex font-medium ps-3.5 items-center  ">
        <DashboardOutlined className="me-3.5" style={{ fontSize: "18px" }} />
        Dashboard
      </div>
    ),
    path: "/dashboard",
  },
  {
    key: "analytics",
    label: (
      <div className="text-xl flex font-medium ps-3.5 items-center  ">
        <LineChartOutlined className="me-3.5" style={{ fontSize: "18px" }} />
        Analytics
      </div>
    ),
    path: "/analytics",
  },
  {
    key: "history",
    label: (
      <div className="text-xl flex font-medium ps-3.5 items-center ">
        <HistoryOutlined className="me-3.5" style={{ fontSize: "18px" }} />
        History
      </div>
    ),
    path: "/history",
  },
  {
    key: "todo",
    label: (
      <div className="text-xl flex font-medium ps-3.5 items-center ">
        <CheckSquareOutlined className="me-3.5" style={{ fontSize: "18px" }} />
        To-do
      </div>
    ),
    path: "/todo",
  },
  {
    key: "report",
    label: (
      <div className="text-xl flex font-medium ps-3.5  items-center  ">
        <FileTextOutlined className="me-3.5" style={{ fontSize: "18px" }} />
        Report
      </div>
    ),
    path: "/report",
  },
  {
    key: "settings",
    label: (
      <div className="text-xl flex font-medium ps-3.5  items-center  ">
        <SettingOutlined className="me-3.5" style={{ fontSize: "18px" }} />
        Settings
      </div>
    ),
    path: "/settings",
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
      className="py-2 px-4 bg-background fixed top-0.5"
      // className="bg-white fixed top-0 left-0 h-screen z-50 shadow-sm"
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
        defaultSelectedKeys={["todo"]}
        items={items}
        onClick={onClick}
        style={{ border: "none" }}
        className="h-screen "
      />
    </Sider>
  );
};

export default Sidebar;
