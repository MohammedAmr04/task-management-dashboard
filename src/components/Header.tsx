import { Button, Input, Tabs } from "antd";
import {
  DashboardOutlined,
  SearchOutlined,
  TableOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <div className=" px-2 py-3">
      <div className="bg-white rounded-4xl  flex justify-between items-center max-w-7xl mx-auto">
        <div className="w-64">
          <Input
            placeholder="Search..."
            allowClear
            variant="borderless"
            className="rounded-3xl [&_.ant-input-affix-wrapper]:!bg-input"
            suffix={null}
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/24"
            // alt="User Avatar"
            width={24}
            height={24}
            className="bg-gray-400 rounded-full object-cover"
          />
          <p className="userName  font-medium">
            <span>workspace</span>
            <br />
            <span>brazily</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center  my-4">
        <Tabs
          defaultActiveKey="2"
          items={[DashboardOutlined, TableOutlined].map((Icon, i) => {
            const id = String(i + 1);
            return {
              key: id,
              children: `Tab ${id}`,
              icon: <Icon />,
            };
          })}
        />
        <Button>New Task</Button>
      </div>
    </div>
  );
};

export default Header;
