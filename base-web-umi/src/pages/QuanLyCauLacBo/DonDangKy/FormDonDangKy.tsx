import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';

const FormDonDangKy = () => {
  const [form] = Form.useForm();
  const model = useModel('quanlycaulacbo.donDangKy' as any) as any;
  const clbModel = useModel('quanlycaulacbo.cauLacBo' as any) as any;
  const [clbOptions, setClbOptions] = useState<{ label: string; value: string }[]>([]);

  const { record, visibleForm, edit, isView, postModel, putModel, setVisibleForm, formSubmiting } = model;

  useEffect(() => {
    clbModel
      .getAllModel(false, { tenCLB: 1 }, undefined, undefined, undefined, false)
      .then((res: QuanLyCauLacBo.ICauLacBo[]) => {
        setClbOptions((res || []).map((item) => ({ label: item.tenCLB, value: item._id || '' })));        
      })
      .catch((error: unknown) => console.log(error));
  }, []);

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
      return;
    }

    if (record?._id) {
      form.setFieldsValue({
        ...record,
        ngayDangKy: record.ngayDangKy ? moment(record.ngayDangKy) : undefined,
      });
      return;
    }

    form.setFieldsValue({
      trangThai: 'Pending',
      ngayDangKy: moment(),
      gioiTinh: 'Nam',
    });
  }, [record?._id, visibleForm]);

  const isReadonly = useMemo(() => isView === true, [isView]);

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      ngayDangKy: values.ngayDangKy?.toISOString?.() || values.ngayDangKy,
    };

    if (edit && record?._id) {
      putModel(record._id, payload).catch((error: unknown) => console.log(error));
    } else {
      postModel(payload)
        .then(() => form.resetFields())
        .catch((error: unknown) => console.log(error));
    }
  };

  return (
    <Card title={isReadonly ? 'Chi tiet don dang ky' : edit ? 'Chinh sua don dang ky' : 'Them moi don dang ky'}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="hoTen" label="Ho ten" rules={[...rules.required, ...rules.text, ...rules.length(250)]}>
          <Input placeholder="Nhap ho ten" disabled={isReadonly} />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[...rules.required, ...rules.email]}>
          <Input placeholder="Nhap email" disabled={isReadonly} />
        </Form.Item>

        <Form.Item name="sdt" label="So dien thoai" rules={[...rules.required, ...rules.soDienThoai]}>
          <Input placeholder="Nhap so dien thoai" disabled={isReadonly} />
        </Form.Item>

        <Form.Item name="gioiTinh" label="Gioi tinh" rules={[...rules.required]}>
          <Select
            disabled={isReadonly}
            options={[
              { label: 'Nam', value: 'Nam' },
              { label: 'Nu', value: 'Nu' },
              { label: 'Khac', value: 'Khac' },
            ]}
            placeholder="Chon gioi tinh"
          />
        </Form.Item>

        <Form.Item name="diaChi" label="Dia chi" rules={[...rules.required, ...rules.length(500)]}>
          <Input placeholder="Nhap dia chi" disabled={isReadonly} />
        </Form.Item>

        <Form.Item name="soTruong" label="So truong" rules={[...rules.required, ...rules.length(500)]}>
          <Input placeholder="Nhap so truong" disabled={isReadonly} />
        </Form.Item>

        <Form.Item name="cauLacBoId" label="Cau lac bo" rules={[...rules.required]}>
          <Select disabled={isReadonly} options={clbOptions} placeholder="Chon cau lac bo" showSearch optionFilterProp="label" />
        </Form.Item>

        <Form.Item name="lyDoDangKy" label="Ly do dang ky" rules={[...rules.required, ...rules.length(1000)]}>
          <Input.TextArea rows={4} placeholder="Nhap ly do dang ky" disabled={isReadonly} />
        </Form.Item>

        <Form.Item name="trangThai" label="Trang thai" rules={[...rules.required]}>
          <Select
            disabled={isReadonly}
            options={[
              { label: 'Pending', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
            ]}
            placeholder="Chon trang thai"
          />
        </Form.Item>

        <Form.Item name="ghiChu" label="Ghi chu">
          <Input.TextArea rows={3} placeholder="Nhap ghi chu (neu tu choi)" disabled={isReadonly} />
        </Form.Item>

        <Form.Item name="ngayDangKy" label="Ngay dang ky" rules={[...rules.required]}>
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" disabled={isReadonly} />
        </Form.Item>

        <div className="form-footer">
          {!isReadonly ? (
            <Button loading={formSubmiting} htmlType="submit" type="primary">
              {edit ? 'Luu lai' : 'Them moi'}
            </Button>
          ) : null}
          <Button onClick={() => setVisibleForm(false)}>{isReadonly ? 'Dong' : 'Huy'}</Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormDonDangKy;
