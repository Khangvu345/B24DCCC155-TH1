import TinyEditor from '@/components/TinyEditor';
import UploadFile from '@/components/Upload/UploadFile';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, DatePicker, Form, Input, Switch } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';

const getAvatarUrl = (value: any): string => {
  if (typeof value === 'string') return value;
  const file = value?.fileList?.[0];
  return file?.url || file?.thumbUrl || file?.response?.url || '';
};

const FormCLB = () => {
  const [form] = Form.useForm();
  const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel(
    'quanlycaulacbo.cauLacBo' as any,
  ) as any;

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
      return;
    }

    if (record?._id) {
      form.setFieldsValue({
        ...record,
        ngayThanhLap: record.ngayThanhLap ? moment(record.ngayThanhLap) : undefined,
        anhDaiDien: record.anhDaiDien,
      });
    } else {
      form.setFieldsValue({
        hoatDong: true,
      });
    }
  }, [record?._id, visibleForm]);

  const onFinish = async (values: any) => {
    const payload: Partial<CauLacBo.IRecord> = {
      ...values,
      anhDaiDien: getAvatarUrl(values.anhDaiDien),
      ngayThanhLap: values.ngayThanhLap ? values.ngayThanhLap.toISOString() : undefined,
    };

    if (edit && record?._id) {
      putModel(record._id, payload).catch((er: unknown) => console.log(er));
    } else {
      postModel(payload)
        .then(() => form.resetFields())
        .catch((er: unknown) => console.log(er));
    }
  };

  return (
    <Card title={edit ? 'Chinh sua cau lac bo' : 'Them moi cau lac bo'}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="anhDaiDien" label="Anh dai dien">
          <UploadFile isAvatarSmall />
        </Form.Item>

        <Form.Item name="tenCLB" label="Ten cau lac bo" rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
          <Input placeholder="Nhap ten cau lac bo" />
        </Form.Item>

        <Form.Item name="ngayThanhLap" label="Ngay thanh lap" rules={[...rules.required]}>
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chon ngay thanh lap" />
        </Form.Item>

        <Form.Item name="chuNhiem" label="Chu nhiem CLB" rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
          <Input placeholder="Nhap ten chu nhiem" />
        </Form.Item>

        <Form.Item name="moTa" label="Mo ta" rules={[...rules.required]}>
          <TinyEditor height={220} hideMenubar />
        </Form.Item>

        <Form.Item name="hoatDong" label="Hoat dong" valuePropName="checked">
          <Switch checkedChildren="Co" unCheckedChildren="Khong" />
        </Form.Item>

        <div className="form-footer">
          <Button loading={formSubmiting} htmlType="submit" type="primary">
            {edit ? 'Luu lai' : 'Them moi'}
          </Button>
          <Button onClick={() => setVisibleForm(false)}>Huy</Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormCLB;
