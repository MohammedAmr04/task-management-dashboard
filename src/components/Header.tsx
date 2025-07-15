import { Button, Input } from "antd";
import {
  SearchOutlined,
  TableOutlined,
  AppstoreOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import user from "../assets/user.jpg";
const Header = () => {
  const location = useLocation();
  const isTodoPage = location.pathname.startsWith("/todo");

  return (
    <div className="px-2 py-3">
      <div className="bg-white px-4 py-2 rounded-3xl flex justify-between items-center max-w-7xl mx-auto">
        <div className="w-64">
          <Input
            placeholder="Search..."
            allowClear
            variant="borderless"
            className="rounded-3xl  [&_.ant-input-affix-wrapper]:!bg-input"
            prefix={<SearchOutlined />}
            style={{ backgroundColor: "var(--c-background)" }}
          />
        </div>
        <div className="flex items-center w-40 gap-4">
          <BellOutlined style={{ fontSize: "1.2rem" }} />
          <div className="flex items-center space-x-2">
            <img src={user} alt="avatar" className="size-8" />
            <div className="flex flex-col text-[8px]">
              <p>Workspace</p>
              <p>brazilyy</p>
            </div>
          </div>
        </div>
      </div>

      {isTodoPage && (
        <div className="flex justify-between items-center my-4 max-w-7xl mx-auto">
          <div className="flex">
            <NavLink
              to="/todo/table-view"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-xl ${
                  isActive ? "bg-[#f2a471] text-white" : "bg-gray-100"
                }`
              }
            >
              <TableOutlined />
            </NavLink>
            <NavLink
              to="/todo/card-view"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-xl ${
                  isActive ? "bg-[#f2a471] text-white" : "bg-gray-100"
                }`
              }
            >
              <AppstoreOutlined />
            </NavLink>
          </div>
          <Button type="primary" className="rounded-xl">
            + New Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
