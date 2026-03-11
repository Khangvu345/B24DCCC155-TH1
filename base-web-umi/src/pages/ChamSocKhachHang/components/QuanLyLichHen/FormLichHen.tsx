import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

const FormLichHen = (props: any) => {
    const { record, visibleForm, setVisibleForm, edit, postModel, putModel } = props.model;
    const modelDichVu = useModel('chamsockhachhang.dichvu.dichVu');
    const modelNhanVien = useModel('chamsockhachhang.nhanvien.nhanVien');
    const [form] = Form.useForm();

    useEffect(() => {
        if (visibleForm) {
            modelDichVu.getModel();
            modelNhanVien.getModel();
            if (edit) {
                form.setFieldsValue({
                    ...record,
                    thoiGian: record?.thoiGian ? moment(record.thoiGian) : null,
                });
            } else {
                form.resetFields();
            }
        }
    }, [visibleForm, edit, record]);

    const onFinish = async (values: any) => {
        const payload = {
            ...values,
            thoiGian: values.thoiGian ? values.thoiGian.toISOString() : null,
        };
        if (edit) {
            await putModel(record._id, payload);
        } else {
            await postModel(payload);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ trangThai: 'Chờ duyệt' }}
        >
            <Form.Item
                name="tenKhachHang"
                label="Tên khách hàng"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
            >
                <Input placeholder="Nhập tên khách hàng" />
            </Form.Item>
            <Form.Item
                name="soDienThoai"
                label="Số điện thoại"
                rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    { pattern: /^[0-9]+$/, message: 'Số dt không hợp lệ' },
                ]}
            >
                <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            
            <Form.Item
                name="thoiGian"
                label="Thời gian đặt lịch"
                rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
            >
                <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
                name="idDichVu"
                label="Dịch vụ"
                rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
            >
                <Select placeholder="Chọn dịch vụ" loading={modelDichVu.loading}>
                    {modelDichVu.danhSach?.map((dv: any) => (
                        <Select.Option key={dv._id} value={dv.tenDichVu}>
                            {dv.tenDichVu}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            
            <Form.Item
                name="idNhanVien"
                label="Nhân viên phục vụ"
                rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
            >
                <Select placeholder="Chọn nhân viên" loading={modelNhanVien.loading}>
                    {modelNhanVien.danhSach?.map((nv: any) => (
                        <Select.Option key={nv._id} value={nv.tenNhanVien}>
                            {nv.tenNhanVien}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            
            {edit && (
                <Form.Item
                    name="trangThai"
                    label="Trạng thái"
                >
                    <Select>
                        <Select.Option value="Chờ duyệt">Chờ duyệt</Select.Option>
                        <Select.Option value="Xác nhận">Xác nhận</Select.Option>
                        <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                        <Select.Option value="Hủy">Hủy</Select.Option>
                    </Select>
                </Form.Item>
            )}

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

export default FormLichHen;
