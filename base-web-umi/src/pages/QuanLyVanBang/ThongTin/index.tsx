import React, { useEffect } from 'react';
import TableBase from '@/components/Table';
import { useModel } from 'umi';
import { IColumn } from '@/components/Table/typing';
import { ThongTinVanBang } from '@/pages/QuanLyVanBang/typing';
import { Form, Input, Select, DatePicker, InputNumber, Button } from 'antd';
import moment from 'moment';

const FormThongTin: React.FC = () => {
  const { record, edit, setVisibleForm, postModel, putModel, formSubmiting } = useModel('quanlyvanbang.thongTin');
  const quyetDinhModel = useModel('quanlyvanbang.quyetDinh');
  const cauHinhModel = useModel('quanlyvanbang.cauHinh');
  const soVanBangModel = useModel('quanlyvanbang.soVanBang');
  const [form] = Form.useForm();

  useEffect(() => {
    quyetDinhModel.getAllModel();
    cauHinhModel.getAllModel();
  }, []);

  useEffect(() => {
    if (edit && record) {
      form.setFieldsValue({
        ...record,
        ngaySinh: record.ngaySinh ? moment(record.ngaySinh) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [edit, record]);

  const renderDynamicField = (field: any) => {
    switch (field.kieuDuLieu) {
      case 'Number':
        return <InputNumber style={{ width: '100%' }} />;
      case 'Date':
        return <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />;
      default:
        return <Input />;
    }
  };

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      ngaySinh: values.ngaySinh?.toISOString(),
    };
    if (edit && record?._id) {
      await putModel(record._id, payload);
    } else {
      await postModel(payload);
      soVanBangModel.getModel();
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ padding: 24 }}>
      <Form.Item name="soHieuVanBang" label="Số hiệu văn bằng" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="maSinhVien" label="Mã sinh viên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="ngaySinh" label="Ngày sinh" rules={[{ required: true }]}>
        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>
      <Form.Item name="quyetDinhId" label="Quyết định tốt nghiệp" rules={[{ required: true }]}>
        <Select>
          {quyetDinhModel.danhSach.map((item: any) => (
            <Select.Option key={item._id || item.id} value={item._id || item.id}>{item.soSQ}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      
      {cauHinhModel.danhSach.length > 0 && <h4>Thông tin bổ sung</h4>}
      {cauHinhModel.danhSach.map((ch: any) => (
        <Form.Item key={ch._id || ch.id} name={['extraFields', ch.maTruong]} label={ch.tenTruong}>
          {renderDynamicField(ch)}
        </Form.Item>
      ))}

      <div style={{ textAlign: 'right' }}>
        <Button onClick={() => setVisibleForm(false)} style={{ marginRight: 8 }}>Hủy</Button>
        <Button type="primary" htmlType="submit" loading={formSubmiting}>{edit ? 'Cập nhật' : 'Thêm mới'}</Button>
      </div>
    </Form>
  );
};

const ThongTinPage: React.FC = () => {
  const quyetDinhModel = useModel('quanlyvanbang.quyetDinh');
  const cauHinhModel = useModel('quanlyvanbang.cauHinh');

  useEffect(() => {
    quyetDinhModel.getAllModel();
    cauHinhModel.getAllModel();
  }, []);

  const fixedColumns: IColumn<ThongTinVanBang>[] = [
    { title: 'Số hiệu VB', dataIndex: 'soHieuVanBang', width: 150, filterType: 'string' },
    { title: 'Số vào sổ', dataIndex: 'soVaoSo', align: 'center', width: 100 },
    { title: 'MSV', dataIndex: 'maSinhVien', width: 120, filterType: 'string' },
    { title: 'Họ tên', dataIndex: 'hoTen', width: 200, filterType: 'string' },
    {
      title: 'Ngày sinh', dataIndex: 'ngaySinh', width: 120,
      render: (val: any) => val ? moment(val).format('DD/MM/YYYY') : '-',
    },
    {
      title: 'Quyết định', dataIndex: 'quyetDinhId', width: 180,
      render: (val: any) => quyetDinhModel.danhSach.find((i: any) => (i._id || i.id) === val)?.soSQ || '-',
    },
  ];

  const dynamicColumns: IColumn<any>[] = cauHinhModel.danhSach.map((ch: any) => ({
    title: ch.tenTruong,
    dataIndex: ['extraFields', ch.maTruong],
    width: 150,
    render: (val: any) => {
      if (val === undefined || val === null) return '-';
      if (ch.kieuDuLieu === 'Date') return moment(val).format('DD/MM/YYYY');
      return val;
    },
  }));

  const columns = [...fixedColumns, ...dynamicColumns];

  return (
    <TableBase
      title="Quản lý thông tin văn bằng"
      modelName="quanlyvanbang.thongTin"
      columns={columns}
      scroll={{ x: 1200 + dynamicColumns.length * 150 }}
      Form={FormThongTin}
    />
  );
};

export default ThongTinPage;
