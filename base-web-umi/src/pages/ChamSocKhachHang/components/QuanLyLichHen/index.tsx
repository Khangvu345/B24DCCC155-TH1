import React from 'react';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import FormLichHen from './FormLichHen';
import { useModel } from 'umi';
import { Tag, Button, Popconfirm, Space } from 'antd';
import moment from 'moment';

const QuanLyLichHen = () => {
    const model = useModel('chamsockhachhang.lichhen.lichHen');

    const columns: IColumn<any>[] = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenKhachHang',
            width: 200,
            filterType: 'string',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
            width: 150,
        },
        {
            title: 'Thời gian đặt',
            dataIndex: 'thoiGian',
            width: 150,
            filterType: 'date',
            render: (val: string) => val ? moment(val).format('DD/MM/YYYY HH:mm') : '',
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'idDichVu',
            width: 200,
        },
        {
            title: 'Nhân viên',
            dataIndex: 'idNhanVien',
            width: 150,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            width: 150,
            render: (val: string) => {
                let color = 'gold';
                if (val === 'Xác nhận') color = 'blue';
                if (val === 'Hoàn thành') color = 'green';
                if (val === 'Hủy') color = 'red';
                return <Tag color={color}>{val}</Tag>;
            }
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
            modelName="chamsockhachhang.lichhen.lichHen"
            title="Lịch hẹn"
            columns={columns}
            Form={(props) => <FormLichHen {...props} model={model} />}
            formType="Drawer"
            widthDrawer={500}
        />
    );
};

export default QuanLyLichHen;