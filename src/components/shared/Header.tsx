import { Button, Input, Segmented } from "antd";
import {
  SearchOutlined,
  TableOutlined,
  AppstoreOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/user.jpg";
import { useState } from "react";
import FormModal from "./../Todo/form/FormModel";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isTodoPage = location.pathname.startsWith("/todo");

  const currentTab = location.pathname.includes("card-view")
    ? "card-view"
    : "table-view";

  const handleSegmentChange = (value: string | number) => {
    if (typeof value === "string") {
      navigate(`/todo/${value}`);
    }
  };

  return (
    <div className="px-2 py-3">
      <div className="bg-card px-4 py-2 rounded-3xl flex justify-between items-center max-w-7xl mx-auto">
        <div className="w-64">
          <Input
            placeholder="Search..."
            allowClear
            variant="borderless"
            className="rounded-3xl [&_.ant-input-affix-wrapper]:!bg-input"
            prefix={<SearchOutlined />}
            style={{
              backgroundColor: "var(--c-background)",
              borderRadius: "20px",
            }}
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
          <div className="flex items-center  gap-4">
            <Segmented
              options={[
                {
                  value: "table-view",
                  icon: <TableOutlined />,
                  className: "transition",
                },
                {
                  value: "card-view",
                  icon: <AppstoreOutlined />,
                  className: "bg-card",
                },
              ]}
              value={currentTab}
              onChange={handleSegmentChange}
              className="custom-segmented"
            />
          </div>

          <Button
            style={{
              color: "var(--c-primary)",
              borderColor: "var(--c-primary)",
              fontWeight: "600",
            }}
            className="rounded-xl border bg-card"
            onClick={showModal}
          >
            + New Task
          </Button>
          <FormModal
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
