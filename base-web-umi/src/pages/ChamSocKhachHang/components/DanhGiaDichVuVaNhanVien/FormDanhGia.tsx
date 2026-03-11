import React, { useEffect } from 'react';
import { Form, Input, Button, Rate } from 'antd';
import { useModel } from 'umi';
import TinyEditor from '@/components/TinyEditor';

const FormDanhGia = (props: any) => {
    const { edit, record, setVisibleForm, putModel } = useModel('chamsockhachhang.danhgia.danhGia');
    const [form] = Form.useForm();

    useEffect(() => {
        if (edit && record) {
            form.setFieldsValue({
                ...record,
                nhanXetKhachHangView: record.nhanXetKhachHang, 
            });
        }
    }, [edit, record, form]);

    const onFinish = async (values: any) => {
        if (edit && record?._id) {
            await putModel(record._id, {
                 phanHoiNhanVien: values.phanHoiNhanVien
            });
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item label="Lịch hẹn" style={{ marginBottom: 0 }}>
                <Form.Item name="tenKhachHang" style={{ display: 'inline-block', width: '33%' }}>
                    <Input disabled addonBefore="KH" />
                </Form.Item>
                <Form.Item name="idDichVu" style={{ display: 'inline-block', width: '33%', padding: '0 8px' }}>
                    <Input disabled addonBefore="DV" />
                </Form.Item>
                <Form.Item name="idNhanVien" style={{ display: 'inline-block', width: '33%' }}>
                    <Input disabled addonBefore="NV" />
                </Form.Item>
            </Form.Item>

            <Form.Item name="soSao" label="Đánh giá sao">
                <Rate disabled />
            </Form.Item>

            <Form.Item name="nhanXetKhachHangView" label="Nhận xét của khách">
                <TinyEditor disabled height={200} />
            </Form.Item>

            <Form.Item name="phanHoiNhanVien" label="Phản hồi của nhân viên">
                <TinyEditor height={200} />
            </Form.Item>

            <Form.Item className="text-center mt-4 mb-0">
                <Button htmlType="button" onClick={() => setVisibleForm(false)} className="mr-2">
                    Quay lại
                </Button>
                <Button type="primary" htmlType="submit">
                    Lưu phản hồi
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormDanhGia;
