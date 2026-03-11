import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { useModel } from 'umi';

const FormDichVu = (props: any) => {
    const { edit, record, setVisibleForm } = useModel('chamsockhachhang.dichvu.dichVu');
    const [form] = Form.useForm();

    useEffect(() => {
        if (edit && record) {
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }
    }, [edit, record]);

    return (
        <Form
            form={form}
            layout="vertical"
            id="form-dichvu"
            onFinish={async (values) => {
                const modelDichVu = props.model; 
                const { postModel, putModel, record, edit } = modelDichVu || {};
                if (edit && record?._id) {
                    await putModel(record._id, values);
                } else {
                    await postModel(values);
                }
            }}
        >
            <Form.Item
                name="tenDichVu"
                label="Tên dịch vụ"
                rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
            >
                <Input placeholder="Nhập tên dịch vụ" />
            </Form.Item>
            
            <Form.Item
                name="thoiGian"
                label="Thời gian"
            >
                <Input placeholder="Nhập thời gian" />
            </Form.Item>
            
            <Form.Item
                name="gia"
                label="Đơn giá (VND)"
                rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
            >
                <InputNumber style={{ width: '100%' }} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} placeholder="Nhập đơn giá" />
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

export default FormDichVu;
