import React from 'react';
import { Button, Popconfirm, Space, Rate } from 'antd';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import FormNhanVien from './FormNhanVien';
import { useModel } from 'umi';

const NhanVien = () => {
    const model = useModel('chamsockhachhang.nhanvien.nhanVien');

    const columns: IColumn<any>[] = [
        {
            title: 'Tên nhân viên',
            dataIndex: 'tenNhanVien',
            width: 200,
            filterType: 'string',
        },
        {
            title: 'Số khách phục vụ trong ngày ',
            dataIndex: 'gioiHanKhach',
            width: 100,
        },
        {
            title: 'Lịch làm việc',
            dataIndex: 'lichLamViec',
            width: 300,
            render: (val: any) => Array.isArray(val) ? val.map((item: any) => `${item.thu} (${item.tuGio} - ${item.denGio})`).join(', ') : '',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'danhGiaTrungBinh',
            width: 150,
            render: (val: number) => <Rate allowHalf disabled defaultValue={val || 0} />
        },
        {
            title: 'Thao tác',
            width: 150,
            align: 'center',
            render: (record: any) => (
                <Space>
                    <Button type="primary" onClick={() => { model.setRecord(record); model.setEdit(true); model.setVisibleForm(true); }}>Sửa</Button>
                    <Popconfirm title="Bạn có phép xóa?" onConfirm={() => model.deleteModel(record._id)}>
                        <Button type="primary" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return (
        <TableBase
            modelName="chamsockhachhang.nhanvien.nhanVien"
            title="Nhân viên"
            columns={columns}
            Form={(props) => <FormNhanVien {...props} model={model} />}
            formType="Drawer"
            widthDrawer={400}
        />
    );
};

export default NhanVien;
