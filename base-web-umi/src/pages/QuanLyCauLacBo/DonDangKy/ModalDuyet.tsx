import { Button, Form, Input, Modal, Typography } from 'antd';
import { useEffect } from 'react';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk: (lyDo?: string) => void;
  type: 'Approved' | 'Rejected';
  count: number;
  loading?: boolean;
};

const ModalDuyet = ({ visible, onCancel, onOk, type, count, loading }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) form.resetFields();
  }, [visible]);

  const submit = async () => {
    if (type === 'Rejected') {
      const values = await form.validateFields();
      onOk(values?.lyDo);
      return;
    }
    onOk();
  };

  return (
    <Modal
      title={type === 'Approved' ? 'Xac nhan duyet don' : 'Xac nhan tu choi don'}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Huy
        </Button>,
        <Button key="ok" type="primary" danger={type === 'Rejected'} loading={loading} onClick={submit}>
          {type === 'Approved' ? 'Duyet' : 'Tu choi'}
        </Button>,
      ]}
      destroyOnClose
    >
      {type === 'Approved' ? (
        <Typography.Text>Xac nhan duyet {count} don da chon?</Typography.Text>
      ) : (
        <Form form={form} layout="vertical">
          <Typography.Text>Vui long nhap ly do tu choi cho {count} don da chon.</Typography.Text>
          <Form.Item
            name="lyDo"
            label="Ly do tu choi"
            rules={[{ required: true, message: 'Vui long nhap ly do tu choi' }]}
            style={{ marginTop: 12 }}
          >
            <Input.TextArea rows={4} placeholder="Nhap ly do tu choi" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ModalDuyet;
