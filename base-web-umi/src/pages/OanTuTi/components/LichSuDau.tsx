import React from 'react';
import { Table, Tag, Typography } from 'antd';
import {
    VanDau,
    KetQua,
    layTenLuaChon,
    layIconLuaChon,
    layTenKetQua,
    layMauKetQua,
} from '@/services/OanTuTi';

const { Title } = Typography;

interface LichSuDauProps {
    lichSu: VanDau[];
}

const LichSuDau: React.FC<LichSuDauProps> = ({ lichSu }) => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            align: 'center' as const,
        },
        {
            title: 'Bạn chọn',
            dataIndex: 'nguoiChoi',
            key: 'nguoiChoi',
            align: 'center' as const,
            render: (luaChon: any) => (
                <span>
                    {layIconLuaChon(luaChon)} {layTenLuaChon(luaChon)}
                </span>
            ),
        },
        {
            title: 'Máy chọn',
            dataIndex: 'mayTinh',
            key: 'mayTinh',
            align: 'center' as const,
            render: (luaChon: any) => (
                <span>
                    {layIconLuaChon(luaChon)} {layTenLuaChon(luaChon)}
                </span>
            ),
        },
        {
            title: 'Kết quả',
            dataIndex: 'ketQua',
            key: 'ketQua',
            align: 'center' as const,
            render: (ketQua: KetQua) => (
                <Tag color={layMauKetQua(ketQua)} style={{ fontWeight: 'bold' }}>
                    {layTenKetQua(ketQua)}
                </Tag>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'thoiGian',
            key: 'thoiGian',
            align: 'center' as const,
        },
    ];

    return (
        <div>
            <Title level={4}>📋 Lịch sử các ván đấu</Title>
            <Table
                columns={columns}
                dataSource={lichSu}
                rowKey='id'
                pagination={{
                    pageSize: 10,
                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} ván`,
                    showSizeChanger: false,
                }}
                bordered
                size='middle'
                locale={{ emptyText: 'Chưa có ván nào được chơi' }}
            />
        </div>
    );
};

export default LichSuDau;
