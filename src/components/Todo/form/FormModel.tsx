import { Input, Modal } from "antd";
import type { FC } from "react";

interface FormModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const FormModal: FC<FormModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      title="Add Task"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={{ "aria-label": "Custom Close Button" }}
    >
      <Input />
    </Modal>
  );
};

export default FormModal;
