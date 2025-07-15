import TableTasks from "./TableTasks";

const TableView = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <header className="flex justify-between items-center px-4 py-2 bg-white rounded-md shadow-sm mb-2">
        <div className="flex-1 font-semibold text-gray-600">To Do Name</div>

        <ul className="flex list-none text-gray-500 font-medium">
          <li className="w-24 text-center">Assignee</li>
          <li className="w-28 text-center">Due Date</li>
          <li className="w-24 text-center">Priority</li>
        </ul>
      </header>
      <TableTasks />
    </section>
  );
};

export default TableView;
