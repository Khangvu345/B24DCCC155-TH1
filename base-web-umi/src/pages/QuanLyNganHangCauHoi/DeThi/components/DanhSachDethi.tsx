import { Button, Modal, Table, Popconfirm, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import TaoDeThi from './TaoDeThi';
import ChiTietDeThi from './ChiTietDeThi';
import moment from 'moment';

const DanhSachDeThi = () => {
    const { danhSachDeThi, loading, fetchDeThi, setVisibleTaoDeThi, visibleTaoDeThi, visibleChiTiet, setVisibleChiTiet, handleXemChiTiet, handleDelete } = useModel('quanlynganhangcauhoi.deThi');

    useEffect(() => {
        fetchDeThi();
    }, []);

    const columns = [
        {
            title: 'Mã Đề Thi',
            dataIndex: 'maDeThi',
            key: 'maDeThi',
        },
        {
            title: 'Môn Học',
            dataIndex: 'monHocId',
            render: (val: any) => val?.tenMonHoc || val
        },
        {
            title: 'Thời gian làm bài',
            dataIndex: 'thoiGianLamBai',
            render: (val: number) => `${val} phút`
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (val: string) => moment(val).format('DD/MM/YYYY HH:mm')
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center' as const,
            render: (text: string, record: any) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleXemChiTiet(record._id)}
                    >
                        Chi tiết
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa đề thi này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setVisibleTaoDeThi(true);
                    }}
                >
                    Tạo đề thi tự động
                </Button>
            </div>
            <Table
                rowKey="_id"
                loading={loading}
                dataSource={danhSachDeThi}
                columns={columns}
                bordered
            />

            <Modal
                destroyOnClose
                footer={null}
                width={800}
                title="Tạo đề thi tự động"
                visible={visibleTaoDeThi}
                onCancel={() => {
                    setVisibleTaoDeThi(false);
                }}
            >
                <TaoDeThi />
            </Modal>

            <Modal
                destroyOnClose
                footer={null}
                width={1000}
                title="Chi tiết Đề Thi"
                visible={visibleChiTiet}
                onCancel={() => {
                    setVisibleChiTiet(false);
                }}
            >
                <ChiTietDeThi />
            </Modal>
        </div>
    );
};

export default DanhSachDeThi;
