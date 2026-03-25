import { Button, Form, Modal, Select, Typography } from 'antd';
import { useEffect } from 'react';

type Props = {
  visible: boolean;
  count: number;
  currentCauLacBoId?: string;
  clbOptions: { label: string; value: string }[];
  onCancel: () => void;
  onOk: (cauLacBoIdMoi: string) => void;
  loading?: boolean;
};

const ModalChuyenCLB = ({
  visible,
  count,
  currentCauLacBoId,
  clbOptions,
  onCancel,
  onOk,
  loading,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) form.resetFields();
  }, [visible]);

  const submit = async () => {
    const values = await form.validateFields();
    onOk(values?.cauLacBoIdMoi);
  };

  const options = clbOptions.filter((item) => item.value !== currentCauLacBoId);

  return (
    <Modal
      title="Chuyen cau lac bo"
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Huy
        </Button>,
        <Button key="ok" type="primary" loading={loading} onClick={submit}>
          Xac nhan
        </Button>,
      ]}
    >
      <Typography.Text>Chuyen {count} thanh vien sang CLB khac</Typography.Text>
      <Form form={form} layout="vertical" style={{ marginTop: 12 }}>
        <Form.Item
          name="cauLacBoIdMoi"
          label="CLB dich"
          rules={[{ required: true, message: 'Vui long chon CLB dich' }]}
        >
          <Select options={options} placeholder="Chon CLB dich" showSearch optionFilterProp="label" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChuyenCLB;
