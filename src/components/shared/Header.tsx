import { Button, Input, Segmented, List, Spin } from "antd";
import {
  SearchOutlined,
  TableOutlined,
  AppstoreOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/user.jpg";
import { useState } from "react";
import { useSearchTasks } from "../../services/api/todo/tasks-query";
import EditTask from "../Todo/shared/editTask/EditTask";
import FormModal from "../Todo/shared/form/FormModel";
import type { ITask } from "./../../services/types/types";
import { useDebounce } from "use-debounce";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const { user: userAuth, isAuthenticated, isLoading, error } = useAuth0();
  const { data: searchResults, isLoading: searchLoading } =
    useSearchTasks(debouncedSearchValue);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="flex items-center w-56 gap-4">
          <BellOutlined style={{ fontSize: "1.2rem" }} />
          <div className="flex items-center space-x-2">
            {isLoading && (
              <span className="text-xs text-border">
                <Spin size="small" />
              </span>
            )}
            {error && (
              <span className="text-xs text-primary">
                Error: {error.message || "Something went wrong"}
              </span>
            )}

            {!isLoading && !error && (
              <>
                {!isAuthenticated && <LoginButton />}
                {isAuthenticated && <LogoutButton />}
                <img
                  src={userAuth?.picture || user}
                  alt="avatar"
                  className="rounded-full size-8"
                />
                <div className="flex flex-col text-[8px]">
                  <p>Workspace</p>
                  <p className="text-xs text-primary italic font-semibold">
                    {userAuth ? userAuth?.nickname : "User"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Results List */}
      {searchValue && searchResults && searchResults.length > 0 && (
        <div className="max-w-7xl h-[300px] overflow-auto mx-auto bg-card rounded-xl shadow p-4 mt-2">
          <List
            loading={searchLoading}
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                className="cursor-pointer hover:bg-background-dark rounded"
                onClick={() => setSelectedTask(item)}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold text-text">{item.title}</span>
                </div>
              </List.Item>
            )}
            locale={{ emptyText: "No tasks found." }}
          />
        </div>
      )}

      {selectedTask && (
        <EditTask
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

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
