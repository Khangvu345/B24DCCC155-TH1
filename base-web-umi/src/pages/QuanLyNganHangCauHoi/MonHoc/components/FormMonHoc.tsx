import { Button, Form, Input, InputNumber } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';

const FormMonHoc = () => {
    const { row, isEdit, setVisible, handleCreate, handleUpdate, loading } = useModel('quanlynganhangcauhoi.monHoc');
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEdit && row) {
            form.setFieldsValue(row);
        } else {
            form.resetFields();
        }
    }, [isEdit, row, form]);

    const onFinish = async (values: any) => {
        if (isEdit && row?._id) {
            await handleUpdate(row._id, values);
        } else {
            await handleCreate(values);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Mã Môn Học"
                name="maMonHoc"
                rules={[{ required: true, message: 'Vui lòng nhập mã môn học!' }]}
            >
                <Input placeholder="Nhập mã môn học" />
            </Form.Item>

            <Form.Item
                label="Tên Môn Học"
                name="tenMonHoc"
                rules={[{ required: true, message: 'Vui lòng nhập tên môn học!' }]}
            >
                <Input placeholder="Nhập tên môn học" />
            </Form.Item>

            <Form.Item
                label="Số tín chỉ"
                name="soTinChi"
                rules={[{ required: true, message: 'Vui lòng nhập số tín chỉ!' }]}
            >
                <InputNumber min={1} max={10} style={{ width: '100%' }} placeholder="Nhập số tín chỉ" />
            </Form.Item>

            <Form.Item
                label="Mô tả"
                name="moTa"
            >
                <Input.TextArea rows={4} placeholder="Nhập mô tả (không bắt buộc)" />
            </Form.Item>

            <div style={{ textAlign: 'right' }}>
                <Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
                    Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {isEdit ? 'Cập nhật' : 'Thêm mới'}
                </Button>
            </div>
        </Form>
    );
};

export default FormMonHoc;
