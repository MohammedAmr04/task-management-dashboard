import {
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  Space,
  message,
} from "antd";
import type { FC } from "react";
import { useForm } from "antd/es/form/Form";
import type {
  ITask,
  IPriority,
  IStatus,
  ISubTask,
} from "../../../../services/types/types";
import { useCreateTask } from "../../../../services/api/todo";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface FormModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: (values: Partial<ITask>) => void;
  initialValues?: Partial<ITask>;
}

const priorityOptions: IPriority[] = ["high", "medium", "low"];
const statusOptions: { label: string; value: IStatus }[] = [
  { label: "To Do", value: "to-do" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

const FormModal: FC<FormModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  initialValues = {},
}) => {
  const [form] = useForm();
  const { mutate } = useCreateTask();
  const [description, setDescription] = useState<string | undefined>(
    initialValues.description ?? ""
  );

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(initialValues);
      setDescription(initialValues.description ?? "");
    }
  }, [isModalOpen, initialValues, form]);

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        if (!description || description.trim() === "") {
          form.setFields([
            {
              name: "description",
              errors: ["Description is required"],
            },
          ]);
          return;
        }

        const finalValues = {
          ...initialValues,
          ...values,
          description,
        };

        // Validate subTasks
        if (finalValues.subTasks) {
          const invalidSubtask = finalValues.subTasks.some(
            (sub: ISubTask) => !sub.title || typeof sub.title !== "string"
          );
          if (invalidSubtask) {
            return message.error("Each sub-task must have a valid title.");
          }
        }

        mutate(finalValues);
        handleOk(finalValues);
        form.resetFields();
        setDescription("");
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const onHandleCancel = () => {
    document.body.style.overflow = "auto";
    handleCancel();
  };

  return (
    <Modal
      title="Add Task"
      open={isModalOpen}
      onOk={onFinish}
      onCancel={onHandleCancel}
      closable
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item label="Description">
          <div data-color-mode="light">
            <MDEditor
              height={200}
              value={description}
              commands={[...commands.getCommands()]}
              onChange={setDescription}
            />
          </div>
        </Form.Item>

        <Form.Item name="assignee" label="Assignee">
          <Input placeholder="Enter assignee name" />
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[
            {
              required: true,
              message: "Please select a due date",
            },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();

                const today = new Date();
                const selectedDate = value.toDate();

                today.setHours(0, 0, 0, 0);
                selectedDate.setHours(0, 0, 0, 0);

                return selectedDate > today
                  ? Promise.resolve()
                  : Promise.reject(new Error("Date must be after today"));
              },
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item name="priority" label="Priority">
              <Select allowClear placeholder="Select priority">
                {priorityOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="status"
              label="Status"
              initialValue="to-do"
              rules={[
                { required: true, message: "Status is required" },
                {
                  validator: (_, value) =>
                    ["to-do", "in-progress", "done"].includes(value)
                      ? Promise.resolve()
                      : Promise.reject("Invalid status"),
                },
              ]}
            >
              <Select disabled={!!initialValues.status}>
                {statusOptions.map(({ label, value }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="tags"
              label="Tags"
              rules={[
                {
                  validator: (_, value) =>
                    !value || Array.isArray(value)
                      ? Promise.resolve()
                      : Promise.reject("Tags must be an array"),
                },
              ]}
            >
              <Select mode="tags" placeholder="Add tags" />
            </Form.Item>
          </Col>
        </Row>

        <Form.List name="subTasks">
          {(fields, { add, remove }) => (
            <>
              <label style={{ fontWeight: 600 }}>Sub Tasks</label>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    rules={[
                      { required: true, message: "Enter sub-task title" },
                    ]}
                  >
                    <Input placeholder="Sub-task title" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Sub-task
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default FormModal;
