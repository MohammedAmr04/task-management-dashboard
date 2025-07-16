import { Outlet } from "react-router-dom";

const ToDoPage = () => {
  return (
    <div className="px-2">
      <Outlet />
    </div>
  );
};

export default ToDoPage;
