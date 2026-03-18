import React, { useEffect } from 'react';
import TableBase from '@/components/Table';
import { useModel } from 'umi';
import { IColumn } from '@/components/Table/typing';
import { CauHinhBieuMau } from '@/pages/QuanLyVanBang/typing';
import { Form, Input, Select, Button } from 'antd';

const FormCauHinh: React.FC = () => {
  const { record, edit, setVisibleForm, postModel, putModel, formSubmiting } = useModel('quanlyvanbang.cauHinh');
  const [form] = Form.useForm();

  useEffect(() => {
    if (edit && record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [edit, record]);

  const onFinish = async (values: any) => {
    if (edit && record?._id) {
      await putModel(record._id, values);
    } else {
      await postModel(values);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ padding: 24 }}>
      <Form.Item name="maTruong" label="Mã trường (viết liền, không dấu)" rules={[{ required: true }]}>
        <Input placeholder="ví dụ: danToc" />
      </Form.Item>
      <Form.Item name="tenTruong" label="Tên trường hiển thị" rules={[{ required: true }]}>
        <Input placeholder="ví dụ: Dân tộc" />
      </Form.Item>
      <Form.Item name="kieuDuLieu" label="Kiểu dữ liệu" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="String">String (Chuỗi)</Select.Option>
          <Select.Option value="Number">Number (Số)</Select.Option>
          <Select.Option value="Date">Date (Ngày tháng)</Select.Option>
        </Select>
      </Form.Item>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={() => setVisibleForm(false)} style={{ marginRight: 8 }}>Hủy</Button>
        <Button type="primary" htmlType="submit" loading={formSubmiting}>{edit ? 'Cập nhật' : 'Thêm mới'}</Button>
      </div>
    </Form>
  );
};

const CauHinhPage: React.FC = () => {
  const columns: IColumn<CauHinhBieuMau>[] = [
    { title: 'Mã trường', dataIndex: 'maTruong', width: 200, filterType: 'string' },
    { title: 'Tên trường', dataIndex: 'tenTruong', width: 250, filterType: 'string' },
    { title: 'Kiểu dữ liệu', dataIndex: 'kieuDuLieu', align: 'center', width: 150 },
  ];

  return (
    <TableBase
      title="Cấu hình biểu mẫu văn bằng"
      modelName="quanlyvanbang.cauHinh"
      columns={columns}
      Form={FormCauHinh}
    />
  );
};

export default CauHinhPage;
