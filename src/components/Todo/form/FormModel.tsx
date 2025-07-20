import { Form, Input, Modal, Select, DatePicker } from "antd";
import type { FC } from "react";
import { useForm } from "antd/es/form/Form";
import type { ITask, IPriority, IStatus } from "../../../services/types/types";
import { useCreateTask } from "../../../services/api/todo";

const { TextArea } = Input;

interface FormModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: (values: Partial<ITask>) => void;
}

const priorityOptions: IPriority[] = ["high", "medium", "low"];
const statusOptions: IStatus[] = ["to-do", "in-progress", "done"];

const FormModal: FC<FormModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [form] = useForm();
  const { mutate } = useCreateTask();
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        mutate(values);
        handleOk(values); // Send form values to parent
        form.resetFields(); // Reset form after submit
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Add Task"
      open={isModalOpen}
      onOk={onFinish}
      onCancel={handleCancel}
      closable
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={3} placeholder="Enter description (optional)" />
        </Form.Item>

        <Form.Item
          name="assignee"
          label="Assignee"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter assignee name" />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="priority" label="Priority">
          <Select allowClear placeholder="Select priority">
            {priorityOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Status" initialValue="to-do">
          <Select>
            {statusOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Add tags" />
        </Form.Item>

        <Form.Item name="image" label="Image URL">
          <Input placeholder="Enter image URL" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
