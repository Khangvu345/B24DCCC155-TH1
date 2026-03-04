import { Button, Modal, Table, Popconfirm, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { DeleteOutlined, FileAddOutlined, PlusOutlined } from '@ant-design/icons';
import TaoDeThiTuCauTruc from './TaoDeThiTuCauTruc';
import FormCauTrucDeThi from './FormCauTrucDeThi';
import { useState } from 'react';

const DanhSachCauTruc = () => {
    const { danhSachCauTruc, loading, fetchCauTruc, handleDeleteCauTrucDeThi, setVisibleTaoDeThiTaiCauTruc, visibleTaoDeThiTaiCauTruc, setCurrentCauTruc } = useModel('quanlynganhangcauhoi.deThi');
    const { data: listMonHoc, fetchMonHoc } = useModel('quanlynganhangcauhoi.monHoc');
    const [visibleMoModalThem, setVisibleMoModalThem] = useState(false);

    useEffect(() => {
        fetchCauTruc();
        if (listMonHoc.length === 0) fetchMonHoc();
    }, []);

    const columns = [
        {
            title: 'Tên Cấu Trúc',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Môn Học',
            dataIndex: 'monHocId',
            render: (val: any) => listMonHoc.find((m: any) => m.id === val)?.tenMonHoc || val
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center' as const,
            render: (text: string, record: any) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<FileAddOutlined />}
                        onClick={() => {
                            setCurrentCauTruc(record);
                            setVisibleTaoDeThiTaiCauTruc(true);
                        }}
                    >
                        Tạo Đề Thi
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa cấu trúc này?"
                        onConfirm={() => handleDeleteCauTrucDeThi(record.id)}
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
                        setVisibleMoModalThem(true);
                    }}
                >
                    Thêm Cấu trúc Đề thi
                </Button>
            </div>
            <Table
                rowKey="id"
                loading={loading}
                dataSource={danhSachCauTruc}
                columns={columns}
                bordered
            />

            <Modal
                destroyOnClose
                footer={null}
                width={600}
                title={`Tạo đề thi từ cấu trúc: ${useModel('quanlynganhangcauhoi.deThi').currentCauTruc?.ten}`}
                visible={visibleTaoDeThiTaiCauTruc}
                onCancel={() => {
                    setVisibleTaoDeThiTaiCauTruc(false);
                    setCurrentCauTruc(undefined);
                }}
            >
                <TaoDeThiTuCauTruc />
            </Modal>

            <Modal
                destroyOnClose
                footer={null}
                width={800}
                title="Tạo Cấu Trúc Đề Thi Khung"
                visible={visibleMoModalThem}
                onCancel={() => setVisibleMoModalThem(false)}
            >
                <FormCauTrucDeThi onCancel={() => setVisibleMoModalThem(false)} />
            </Modal>
        </div>
    );
};

export default DanhSachCauTruc;
