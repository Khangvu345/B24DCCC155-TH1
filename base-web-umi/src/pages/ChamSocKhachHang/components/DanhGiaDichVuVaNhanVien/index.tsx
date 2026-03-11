import React from 'react';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import FormDanhGia from './FormDanhGia';
import { useModel } from 'umi';
import { Rate, Space, Button, Popconfirm } from 'antd';

const DanhGiaDichVuVaNhanVien = () => {
    const model = useModel('chamsockhachhang.danhgia.danhGia');

    const columns: IColumn<any>[] = [
        {
            title: 'Khách hàng',
            dataIndex: 'tenKhachHang',
            width: 150,
            filterType: 'string',
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'idDichVu',
            width: 150,
        },
        {
            title: 'Nhân viên',
            dataIndex: 'idNhanVien',
            width: 150,
        },
        {
            title: 'Đánh giá',
            dataIndex: 'soSao',
            width: 150,
            render: (val: number) => <Rate disabled defaultValue={val} />
        },
        {
             title: 'Trạng thái',
             width: 150,
             render: (val: any, record: any) => record.phanHoiNhanVien ? <span style={{color: 'green'}}>Đã phản hồi</span> : <span style={{color: 'red'}}>Chưa phản hồi</span>
        },
        {
            title: 'Thao tác',
            width: 150,
            align: 'center',
            render: (record: any) => (
                <Space>
                    <Button type="primary" onClick={() => { model.setRecord(record); model.setEdit(true); model.setVisibleForm(true); }}>Phản hồi</Button>
                    <Popconfirm title="Bạn có phép xóa đánh giá này?" onConfirm={() => model.deleteModel(record._id)}>
                        <Button type="primary" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return (
        <TableBase
            modelName="chamsockhachhang.danhgia.danhGia"
            title="Đánh Giá Phản Hồi Khách Hàng"
            columns={columns}
            Form={(props) => <FormDanhGia {...props} model={model} />}
            formType="Drawer"
            widthDrawer={800}
            buttons={{ create: false }}
        />
    );
};

export default DanhGiaDichVuVaNhanVien;