import TinyEditor from '@/components/TinyEditor';
import UploadFile from '@/components/Upload/UploadFile';
import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input, InputNumber, Rate, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const loaiHinhOptions = [
  { label: 'Biển', value: 'Bien' },
  { label: 'Núi', value: 'Nui' },
  { label: 'Thành phố', value: 'ThanhPho' },
];

const getAvatarUrl = (value: any): string => {
  if (typeof value === 'string') return value;
  const file = value?.fileList?.[0];
  return file?.url || file?.thumbUrl || file?.response?.url || '';
};

const FormDiemDen = () => {
  const [form] = Form.useForm();
  const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } = useModel(
    'kehoachdulich.diemDen' as any,
  ) as any;

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
      return;
    }

    if (record?._id) {
      form.setFieldsValue({
        ...record,
        anhDaiDien: record.anhDaiDien,
      });
    }
  }, [record?._id, visibleForm]);

  const onFinish = async (values: any) => {
    const chiPhiAnUong = Number(values.chiPhiAnUong || 0);
    const chiPhiLuuTru = Number(values.chiPhiLuuTru || 0);
    const chiPhiDiChuyen = Number(values.chiPhiDiChuyen || 0);

    const payload: Partial<KeHoachDuLich.IDiemDen> = {
      ...values,
      anhDaiDien: getAvatarUrl(values.anhDaiDien),
      rating: Number(values.rating || 0),
      thoiGianThamQuan: Number(values.thoiGianThamQuan || 0),
      chiPhiAnUong,
      chiPhiLuuTru,
      chiPhiDiChuyen,
      giaDuKien: chiPhiAnUong + chiPhiLuuTru + chiPhiDiChuyen,
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
    <Card title={edit ? 'Chỉnh sửa điểm đến' : 'Thêm mới điểm đến'}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="anhDaiDien" label="Ảnh đại diện">
          <UploadFile isAvatarSmall />
        </Form.Item>

        <Form.Item name="ten" label="Tên điểm đến" rules={[...rules.required, ...rules.text, ...rules.length(200)]}>
          <Input placeholder="Nhập tên điểm đến" />
        </Form.Item>

        <Form.Item name="diaDiem" label="Địa điểm" rules={[...rules.required, ...rules.text, ...rules.length(200)]}>
          <Input placeholder="Nhập địa điểm" />
        </Form.Item>

        <Form.Item name="loaiHinh" label="Loại hình" rules={[...rules.required]}>
          <Select options={loaiHinhOptions} placeholder="Chọn loại hình" />
        </Form.Item>

        <Form.Item name="rating" label="Rating">
          <Rate allowHalf />
        </Form.Item>

        <Form.Item name="thoiGianThamQuan" label="Thời gian tham quan (phút)" rules={[...rules.required]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="chiPhiAnUong" label="Chi phí ăn uống" rules={[...rules.required]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="chiPhiLuuTru" label="Chi phí lưu trú" rules={[...rules.required]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="chiPhiDiChuyen" label="Chi phí di chuyển" rules={[...rules.required]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="moTa" label="Mô tả" rules={[...rules.required]}>
          <TinyEditor height={220} hideMenubar />
        </Form.Item>

        <div className="form-footer">
          <Button loading={formSubmiting} htmlType="submit" type="primary">
            {edit ? 'Lưu lại' : 'Thêm mới'}
          </Button>
          <Button onClick={() => setVisibleForm(false)}>Hủy</Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormDiemDen;
