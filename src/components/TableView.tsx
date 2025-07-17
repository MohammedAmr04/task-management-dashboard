import { useTasksByStatus } from "../services/api/todo/tasks-query";
import TableTasks from "./TableTasks";

const TableView = () => {
  const todo = useTasksByStatus("to-do");
  const progress = useTasksByStatus("in-progress");
  const done = useTasksByStatus("done");

  return (
    <section className="max-w-7xl mx-auto">
      <header className="flex justify-between items-center px-4 py-2 bg-white rounded-md shadow-sm mb-2">
        <div className="flex-1 font-semibold text-gray-600">To Do Name</div>

        <ul className="flex list-none text-text font-medium">
          <li className="w-24 text-center">Assignee</li>
          <li className="w-28 text-center">Due Date</li>
          <li className="w-24 text-center">Priority</li>
        </ul>
      </header>
      <TableTasks title="To Do" tasks={todo?.data || []} />
      <TableTasks title="In progress" tasks={progress?.data || []} />
      <TableTasks title="Done" tasks={done.data || []} />
    </section>
  );
};

export default TableView;
