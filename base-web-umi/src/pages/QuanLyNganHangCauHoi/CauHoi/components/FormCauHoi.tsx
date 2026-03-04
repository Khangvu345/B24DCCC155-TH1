import { Button, Form, Input, Select, Col, Row } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';

const FormCauHoi = () => {
    const { row, isEdit, setVisible, handleCreate, handleUpdate, loading } = useModel('quanlynganhangcauhoi.cauHoi');
    const { data: listMonHoc } = useModel('quanlynganhangcauhoi.monHoc');
    const { data: listKhoiKienThuc } = useModel('quanlynganhangcauhoi.khoiKienThuc');
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEdit && row) {
            form.setFieldsValue({
                ...row,
                monHocId: typeof row.monHocId === 'object' ? row.monHocId?._id : row.monHocId,
                khoiKienThucId: typeof row.khoiKienThucId === 'object' ? row.khoiKienThucId?._id : row.khoiKienThucId,
            });
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
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Mã Câu Hỏi"
                        name="maCauHoi"
                        rules={[{ required: true, message: 'Vui lòng nhập mã câu hỏi!' }]}
                    >
                        <Input placeholder="Nhập mã câu hỏi..." />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Mức độ khó"
                        name="mucDoKho"
                        rules={[{ required: true, message: 'Vui lòng chọn mức độ khó!' }]}
                    >
                        <Select placeholder="Chọn mức độ khó">
                            <Select.Option value="Dễ">Dễ</Select.Option>
                            <Select.Option value="Trung bình">Trung bình</Select.Option>
                            <Select.Option value="Khó">Khó</Select.Option>
                            <Select.Option value="Rất khó">Rất khó</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Môn học"
                        name="monHocId"
                        rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn môn học"
                            options={listMonHoc.map((m: any) => ({ value: m._id, label: m.tenMonHoc }))}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Khối kiến thức"
                        name="khoiKienThucId"
                        rules={[{ required: true, message: 'Vui lòng chọn khối kiến thức!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn khối kiến thức"
                            options={listKhoiKienThuc.map((k: any) => ({ value: k._id, label: k.tenKhoiKienThuc }))}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Nội dung câu hỏi"
                name="noiDung"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
            >
                <Input.TextArea rows={6} placeholder="Nhập nội dung câu hỏi..." />
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

export default FormCauHoi;
