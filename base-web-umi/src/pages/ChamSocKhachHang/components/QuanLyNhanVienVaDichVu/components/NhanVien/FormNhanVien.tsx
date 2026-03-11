import React, { useEffect } from 'react';
import { Form, Input, Button, Select, TimePicker, Space } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

const FormNhanVien = (props: any) => {
    const { edit, record, setVisibleForm } = useModel('chamsockhachhang.nhanvien.nhanVien');
    const [form] = Form.useForm();

    useEffect(() => {
        if (edit && record) {
            const formattedRecord = { ...record };
            if (Array.isArray(formattedRecord.lichLamViec)) {
                 formattedRecord.lichLamViec = formattedRecord.lichLamViec.map((item: any) => ({
                      thu: item.thu,
                      tuGio: item.tuGio ? moment(item.tuGio, 'HH:mm') : null,
                      denGio: item.denGio ? moment(item.denGio, 'HH:mm') : null,
                 }));
            }
            form.setFieldsValue(formattedRecord);
        } else {
            form.resetFields();
        }
    }, [edit, record, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            id="form-nhanvien"
            onFinish={async (values) => {
                const modelNhanVien = props.model; 
                const { postModel, putModel, record, edit } = modelNhanVien || {};
                
                const formattedValues = { ...values };
                if (Array.isArray(formattedValues.lichLamViec)) {
                     formattedValues.lichLamViec = formattedValues.lichLamViec.map((item: any) => ({
                          thu: item.thu,
                          tuGio: item.tuGio ? item.tuGio.format('HH:mm') : null,
                          denGio: item.denGio ? item.denGio.format('HH:mm') : null,
                     }));
                }

                if (edit && record?._id) {
                    await putModel(record._id, formattedValues);
                } else {
                    await postModel(formattedValues);
                }
            }}
        >
            <Form.Item
                name="tenNhanVien"
                label="Tên nhân viên"
                rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
            >
                <Input placeholder="Nhập tên nhân viên" />
            </Form.Item>
            
            <Form.Item
                name="gioiHanKhach"
                label="Số khách phục vụ"
                rules={[{ required: true, message: 'Vui lòng nhập số khách phục vụ' }]}
            >
                <Input placeholder="Nhập số khách phục vụ" />
            </Form.Item>
            
            <Form.Item label="Lịch làm việc" style={{ marginBottom: 0 }}>
                <Form.List name="lichLamViec">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'thu']}
                                        rules={[{ required: true, message: 'Chọn thứ' }]}
                                    >
                                        <Select placeholder="Chọn thứ" style={{ width: 100 }}>
                                            {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map(t => (
                                                <Select.Option key={t} value={t}>{t}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'tuGio']}
                                        rules={[{ required: true, message: 'Từ giờ' }]}
                                    >
                                        <TimePicker format="HH:mm" placeholder="Từ" />
                                    </Form.Item>
                                    <span style={{ padding: '0 8px' }}>-</span>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'denGio']}
                                        rules={[{ required: true, message: 'Đến giờ' }]}
                                    >
                                        <TimePicker format="HH:mm" placeholder="Đến" />
                                    </Form.Item>
                                    <Button onClick={() => remove(name)} danger>Xóa</Button>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    Thêm lịch làm việc
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>

            <Form.Item className="text-center mt-4 mb-0">
                <Button htmlType="button" onClick={() => setVisibleForm(false)} className="mr-2">
                    Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                    {edit ? 'Lưu' : 'Thêm mới'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormNhanVien;
