import type { ITask } from "../../../services/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckSquare } from "@phosphor-icons/react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import EditTask from "../editTask/EditTask";
import dayjs from "dayjs";

const CardTask = ({ task }: { task: ITask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const tasksFinished = task.subTasks?.filter((task) => task.finished === true);
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-card border !opacity-100 border-border py-4 rounded-xl shadow-sm  flex flex-col gap-2 cursor-move"
        onClick={() => {
          showModal();
        }}
      >
        <div className="font-semibold px-4 text-text text-lg">{task.title}</div>
        <div className="px-4">
          <MDEditor.Markdown
            className="text-sm !text-text-light"
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
          <span className="text-xs text-text-light">{task.assignee}</span>
        </div>
        <hr className="text-border" />
        <div className="flex px-4 mt-2 justify-between items-center">
          <span className="text-xs flex items-center gap-1 font-semibold text-text-light">
            <CheckSquare size={18} weight="bold" />
            {task.subTasks &&
              task.subTasks?.length > 0 &&
              `${tasksFinished?.length}/${task.subTasks?.length}`}{" "}
          </span>
          <span className="text-xs self-end font-semibold text-text-light">
            {dayjs(task.dueDate).format("YYYY-MM-DD")}
          </span>
        </div>
      </div>
      <EditTask
        task={task}
        isOpen={!!isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default CardTask;
