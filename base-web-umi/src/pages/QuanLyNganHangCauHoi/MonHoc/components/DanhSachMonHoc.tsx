import { Button, Modal, Table, Popconfirm, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormMonHoc from './FormMonHoc';

const DanhSachMonHoc = () => {
    const { data, loading, fetchMonHoc, setRow, isEdit, setVisible, setIsEdit, visible, handleDelete } = useModel('quanlynganhangcauhoi.monHoc');

    useEffect(() => {
        fetchMonHoc();
    }, []);

    const columns = [
        {
            title: 'Mã Môn Học',
            dataIndex: 'maMonHoc',
            key: 'maMonHoc',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
        },
        {
            title: 'Số tín chỉ',
            dataIndex: 'soTinChi',
            key: 'soTinChi',
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center' as const,
            render: (text: string, record: any) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setRow(record);
                            setIsEdit(true);
                            setVisible(true);
                        }}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa môn học này?"
                        onConfirm={() => handleDelete(record.id)}
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
                        setRow(undefined);
                        setIsEdit(false);
                        setVisible(true);
                    }}
                >
                    Thêm mới
                </Button>
            </div>
            <Table
                rowKey="id"
                loading={loading}
                dataSource={data}
                columns={columns}
                bordered
            />

            <Modal
                destroyOnClose
                footer={null}
                title={isEdit ? 'Cập nhật Môn Học' : 'Thêm mới Môn Học'}
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <FormMonHoc />
            </Modal>
        </div>
    );
};

export default DanhSachMonHoc;
