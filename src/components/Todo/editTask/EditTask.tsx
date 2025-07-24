import {
  Modal,
  Typography,
  Tag,
  Button,
  Input,
  Tabs,
  Descriptions,
  Select,
  Space,
  List,
} from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUpdateTask } from "../../../services/api/todo/tasks-query";
import type {
  IStatus,
  ISubTask,
  ITask,
  IComment,
} from "../../../services/types";
import MDEditor from "@uiw/react-md-editor";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { CiCircleCheck } from "react-icons/ci";
// import { type } from "./../../../services/types/types";

const { Title, Paragraph, Text } = Typography;

const EditTask = ({
  isOpen,
  onClose,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  task: ITask;
}) => {
  const [tabKey, setTabKey] = useState("comments");
  const { mutate } = useUpdateTask();

  const [editTitle, setEditTitle] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [descValue, setDescValue] = useState(task.description || "");

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<IComment[]>(task.comments || []);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const handleUpdate = (
    field: keyof ITask,
    value: string | IStatus | ISubTask[] | IComment[] | string[] | boolean
  ) => {
    mutate({ id: task.id, task: { [field]: value } });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newOne: IComment = {
      id: uuidv4(),
      content: newComment.trim(),
      date: new Date().toISOString(),
    };
    const updated = [...comments, newOne];
    setComments(updated);
    handleUpdate("comments", updated);
    setNewComment("");
  };

  const handleEditComment = (id: string, newContent: string) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, content: newContent } : c
    );
    setComments(updated);
    handleUpdate("comments", updated);
    setEditingCommentId(null);
    setEditedContent("");
  };
  const handleToggleSubTask = (id: string) => {
    if (!task.subTasks) return;
    const updated = task.subTasks.map((sub) =>
      sub.id === id ? { ...sub, finished: !sub.finished } : sub
    );
    handleUpdate("subTasks", updated);
  };
  const onCancel = () => {
    document.body.style.overflow = "auto";
    onClose();
  };
  return (
    <Modal
      title={task.id}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={600}
      closable
    >
      <div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex-1">
            {/* Title and Status */}
            <div className="flex justify-between items-center">
              <div className="flex  items-center gap-2">
                {editTitle ? (
                  <>
                    <Input
                      defaultValue={task.title}
                      onBlur={(e) => {
                        handleUpdate("title", e.target.value);
                        setEditTitle(false);
                      }}
                      autoFocus
                    />
                    <CheckOutlined
                      onClick={() => setEditTitle(false)}
                      className="cursor-pointer"
                    />
                  </>
                ) : (
                  <Title level={4} className="text-text">
                    <Space>
                      {task.title}
                      <EditOutlined onClick={() => setEditTitle(true)} />
                    </Space>
                  </Title>
                )}
              </div>
              <Tag color="var(--color-primary)">{task.status}</Tag>
            </div>
            {/* Description */}
            <div className="mt-4">
              <Text strong className="text-text">
                Description
                <EditOutlined
                  onClick={() => setEditDescription(true)}
                  style={{ cursor: "pointer" }}
                  className="ms-2"
                />
              </Text>
              <div className="mt-2">
                {editDescription ? (
                  <>
                    <MDEditor
                      value={descValue}
                      onChange={(val) => setDescValue(val || "")}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        onClick={() => {
                          handleUpdate("description", descValue || "");
                          setEditDescription(false);
                        }}
                        type="primary"
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <MDEditor.Markdown source={task.description} />
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex ">
            <Descriptions
              column={1}
              bordered
              size="small"
              labelStyle={{ color: "var(--color-text-light)" }}
              contentStyle={{ color: "var(--color-text)" }}
            >
              <Descriptions.Item label="Assignee">
                {editAssignee ? (
                  <Input
                    defaultValue={task.assignee || "unassignee"}
                    onBlur={(e) => {
                      handleUpdate("assignee", e.target.value);
                      setEditAssignee(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <Space>
                    {task.assignee}
                    <EditOutlined onClick={() => setEditAssignee(true)} />
                  </Space>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Due Date">
                {dayjs(task.dueDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Priority">
                <Select
                  value={task.priority}
                  onChange={(value) => handleUpdate("priority", value)}
                  className="w-full"
                >
                  <Select.Option value="high">High</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="low">Low</Select.Option>
                </Select>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        {/* Tags */}
        {task.tags && task.tags?.length > 0 && (
          <div className="mt-6">
            <Text strong>Tags:</Text>
            <Space wrap className="ms-2 mt-2">
              {task.tags.map((tag, i) => (
                <Tag className="tag tag-success" key={i}>
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        )}
        {/* Subtasks */}
        {task.subTasks && task.subTasks.length > 0 && (
          <div className="mt-6">
            <Text strong>Subtasks</Text>
            <List
              size="small"
              bordered
              className="mt-2"
              dataSource={task.subTasks}
              renderItem={(sub) => (
                <List.Item
                  className="flex justify-between items-center"
                  onClick={() => handleToggleSubTask(sub.id)}
                >
                  <span>{sub.title}</span>
                  <CiCircleCheck
                    className={`text-lg cursor-pointer rounded-full ${
                      sub.finished ? "text-primary" : "text-gray-400"
                    }`}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
        {/* Tabs */}
        <div className="mt-4">
          <Tabs activeKey={tabKey} className="m-0" onChange={setTabKey}>
            <Tabs.TabPane tab="Comments" key="comments">
              <List
                dataSource={comments}
                renderItem={(comment) => (
                  <List.Item key={comment.id}>
                    <div className="w-full">
                      {editingCommentId === comment.id ? (
                        <>
                          <Input.TextArea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            autoSize
                          />
                          <div className="flex justify-end mt-1 gap-2">
                            <Button
                              type="primary"
                              onClick={() =>
                                handleEditComment(comment.id, editedContent)
                              }
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditedContent("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex px-3 justify-between">
                          <div>
                            <div>{comment.content}</div>
                            <div className="text-xs text-text">
                              {dayjs(comment.date).format(
                                "MMM D, YYYY hh:mm A"
                              )}
                            </div>
                          </div>
                          <EditOutlined
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditedContent(comment.content);
                            }}
                            className="cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </List.Item>
                )}
                locale={{ emptyText: "No comments yet." }}
              />
              <Input.TextArea
                rows={3}
                value={newComment}
                placeholder="Add a comment..."
                onChange={(e) => setNewComment(e.target.value)}
                className="mt-4"
              />
              <div className="flex justify-end mt-2">
                <Button type="primary" onClick={handleAddComment}>
                  Add Comment
                </Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="History" key="history">
              <Paragraph>No history yet.</Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Work Log" key="worklog">
              <Paragraph>No logs yet.</Paragraph>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
};

export default EditTask;
