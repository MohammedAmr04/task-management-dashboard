import { Outlet } from "react-router-dom";

const ToDo = () => {
  return (
    <div className="px-2">
      <Outlet />
    </div>
  );
};

export default ToDo;
