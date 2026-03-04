import { Button, Form, Select, Col, Row, InputNumber, Space } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const TaoDeThi = () => {
    const { handleTaoDeThi, loading, setVisibleTaoDeThi } = useModel('quanlynganhangcauhoi.deThi');
    const { data: listMonHoc, fetchMonHoc } = useModel('quanlynganhangcauhoi.monHoc');
    const { data: listKhoiKienThuc, fetchKhoiKienThuc } = useModel('quanlynganhangcauhoi.khoiKienThuc');
    const [form] = Form.useForm();

    useEffect(() => {
        if (listMonHoc.length === 0) fetchMonHoc();
        if (listKhoiKienThuc.length === 0) fetchKhoiKienThuc();
    }, []);

    const onFinish = async (values: any) => {
        try {
            await handleTaoDeThi(values);
        } catch (e) {
            // Error mapping is handled in services interceptor or model
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ cauTrucDiem: [{ khoiKienThucId: undefined, mucDoKho: undefined, soLuong: 1, diemMoiCau: 1 }] }}
        >
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
                        label="Thời gian làm bài (Phút)"
                        name="thoiGianLamBai"
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                    >
                        <InputNumber min={5} style={{ width: '100%' }} placeholder="Ví dụ: 90" />
                    </Form.Item>
                </Col>
            </Row>

            <h3>Cấu trúc câu hỏi</h3>
            <Form.List name="cauTrucDiem">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'khoiKienThucId']}
                                    rules={[{ required: true, message: 'Chọn Khối KT!' }]}
                                >
                                    <Select
                                        style={{ width: 220 }}
                                        placeholder="Khối kiến thức"
                                        options={listKhoiKienThuc.map((k: any) => ({ value: k._id, label: k.tenKhoiKienThuc }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'mucDoKho']}
                                    rules={[{ required: true, message: 'Chọn mức độ!' }]}
                                >
                                    <Select style={{ width: 140 }} placeholder="Mức độ khó">
                                        <Select.Option value="Dễ">Dễ</Select.Option>
                                        <Select.Option value="Trung bình">Trung bình</Select.Option>
                                        <Select.Option value="Khó">Khó</Select.Option>
                                        <Select.Option value="Rất khó">Rất khó</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'soLuong']}
                                    rules={[{ required: true, message: 'Nhập SL!' }]}
                                >
                                    <InputNumber placeholder="SL" min={1} style={{ width: 80 }} />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'diemMoiCau']}
                                    rules={[{ required: true, message: 'Nhập Điểm!' }]}
                                >
                                    <InputNumber placeholder="Điểm" min={0.25} step={0.25} style={{ width: 80 }} />
                                </Form.Item>
                                {fields.length > 1 && (
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                                )}
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Thêm cấu trúc
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Button onClick={() => setVisibleTaoDeThi(false)} style={{ marginRight: 8 }}>
                    Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Tạo đề thi tự động
                </Button>
            </div>
        </Form>
    );
};

export default TaoDeThi;
