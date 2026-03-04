import { Button, Form, Select, Col, Row, InputNumber, Space, Input } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createCauTruc } from '@/services/QuanLyNganHangCauHoi/deThi';

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
            // Backend taoTuDong expects tieuDe and cauTrucDeThiId
            // So we first create the CauTrucDeThi based on the form values
            const cauTrucPayload = {
                ten: `Cấu trúc đề tự động - ${new Date().getTime()}`,
                monHocId: values.monHocId,
                danhSachYeuCau: values.cauTrucDiem.map((c: any) => ({
                    khoiKienThucId: c.khoiKienThucId,
                    mucDo: c.mucDo,
                    soCau: c.soLuong
                }))
            };
            const cauTrucRes = await createCauTruc(cauTrucPayload);
            const cauTrucId = cauTrucRes.data.data.id;

            // Then call taoTuDong with the new structure
            await handleTaoDeThi({
                tieuDe: values.tieuDe,
                cauTrucDeThiId: cauTrucId
            });
        } catch (e) {
            // Error handling
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ cauTrucDiem: [{ khoiKienThucId: undefined, mucDo: undefined, soLuong: 1 }] }}
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
                            options={listMonHoc.map((m: any) => ({ value: m.id, label: m.tenMonHoc }))}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Tiêu đề đề thi"
                        name="tieuDe"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input placeholder="Ví dụ: Đề thi Giữa kỳ 1" />
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
                                        options={listKhoiKienThuc.map((k: any) => ({ value: k.id, label: k.ten }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'mucDo']}
                                    rules={[{ required: true, message: 'Chọn mức độ!' }]}
                                >
                                    <Select style={{ width: 140 }} placeholder="Mức độ khó">
                                        <Select.Option value="de">Dễ</Select.Option>
                                        <Select.Option value="trungBinh">Trung bình</Select.Option>
                                        <Select.Option value="kho">Khó</Select.Option>
                                        <Select.Option value="ratKho">Rất khó</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'soLuong']}
                                    rules={[{ required: true, message: 'Nhập SL!' }]}
                                >
                                    <InputNumber placeholder="SL" min={1} style={{ width: 80 }} />
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
