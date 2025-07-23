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
} from "antd";
import type { FC } from "react";
import { useForm } from "antd/es/form/Form";
import type { ITask, IPriority, IStatus } from "../../../services/types/types";
import { useCreateTask } from "../../../services/api/todo";
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

  // Set initial values when modal opens
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
        const finalValues = {
          ...initialValues,
          ...values,
          description,
        };
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
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
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
            <Form.Item name="status" label="Status" initialValue="to-do">
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
            <Form.Item name="tags" label="Tags">
              <Select mode="tags" placeholder="Add tags" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="image" label="Image URL">
          <Input placeholder="Enter image URL" />
        </Form.Item>

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
