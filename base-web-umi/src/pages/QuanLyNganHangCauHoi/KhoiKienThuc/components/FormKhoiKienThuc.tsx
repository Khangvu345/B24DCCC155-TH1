import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';

const FormKhoiKienThuc = () => {
    const { row, isEdit, setVisible, handleCreate, handleUpdate, loading } = useModel('quanlynganhangcauhoi.khoiKienThuc');
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEdit && row) {
            form.setFieldsValue(row);
        } else {
            form.resetFields();
        }
    }, [isEdit, row, form]);

    const onFinish = async (values: any) => {
        if (isEdit && row?.id) {
            await handleUpdate(row.id, values);
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
                label="Tên Khối Kiến Thức"
                name="ten"
                rules={[{ required: true, message: 'Vui lòng nhập tên khối kiến thức!' }]}
            >
                <Input placeholder="Nhập tên khối kiến thức" />
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

export default FormKhoiKienThuc;
