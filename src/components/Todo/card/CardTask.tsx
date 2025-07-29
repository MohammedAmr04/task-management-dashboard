import type { ITask } from "../../../services/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckSquare, UsersThree } from "@phosphor-icons/react";
import MDEditor from "@uiw/react-md-editor";
import { memo } from "react";
import dayjs from "dayjs";
import { Calendar } from "@phosphor-icons/react";

const CardTask = ({
  task,
  onSelect,
}: {
  task: ITask;
  onSelect: (t: ITask) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  const style = {
    transform: `${CSS.Translate.toString(transform)}`,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const tasksFinished = task.subTasks?.filter((task) => task.finished === true);
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-card border !opacity-100 border-border py-4 rounded-xl shadow-sm  flex flex-col gap-2 cursor-move"
      onClick={() => {
        onSelect(task);
      }}
    >
      <h3 className="font-semibold px-4 text-text text-lg">{task.title}</h3>
      <div className="px-4 line-clamp-4 ">
        <MDEditor.Markdown
          className="text-sm !text-text-light line-clamp-4 !bg-transparent"
          source={task.description}
        />
      </div>
      <div className="flex px-4 justify-between items-center mt-2">
        <div className="flex gap-2">
          {task.tags && task.tags.length > 0 ? (
            <>
              <span className="tag tag-success">{task.tags[0]}</span>
              {task.tags[1] && (
                <span className="tag tag-danger">{task.tags[1]}</span>
              )}
              {task.tags.length >= 3 && (
                <span className="tag tag-warning">{task.tags.length}</span>
              )}
            </>
          ) : (
            <div className="h-0.5"></div>
          )}
        </div>
        {task.assignee ? (
          <span className=" tag tag-warning">
            {task.assignee.substring(0, 2)}
          </span>
        ) : (
          <UsersThree size={18} />
        )}{" "}
      </div>
      <hr className="text-border" />
      <div className="flex px-4 mt-2 justify-between items-center">
        <span className="text-xs flex items-center gap-1 font-semibold text-text-light">
          <CheckSquare size={18} weight="bold" />
          {task.subTasks &&
            task.subTasks?.length > 0 &&
            `${tasksFinished?.length}/${task.subTasks?.length}`}{" "}
        </span>
        <span className="text-xs flex items-center gap-1 font-semibold text-text-light">
          {task.dueDate && (
            <>
              <Calendar size={18} /> {dayjs(task.dueDate).format("D MMM'YY")}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default memo(CardTask);
