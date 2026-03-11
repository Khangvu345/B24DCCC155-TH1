import React from 'react';
import { Button, Popconfirm, Space } from 'antd';
import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import FormDichVu from './FormDichVu';
import { useModel } from 'umi';

const DichVu = () => {
    const model = useModel('chamsockhachhang.dichvu.dichVu');

    const columns: IColumn<any>[] = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'tenDichVu',
            width: 200,
            filterType: 'string',
        },
        {
            title: 'Thời gian',
            dataIndex: 'thoiGian',
            width: 150,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'gia',
            width: 150,
            render: (val: any) => val ? `${val.toLocaleString()} VND` : '',
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
            modelName="chamsockhachhang.dichvu.dichVu"
            title="Dịch vụ"
            columns={columns}
            Form={(props) => <FormDichVu {...props} model={model} />}
            formType="Drawer"
            widthDrawer={400}
        />
    );
};

export default DichVu;
