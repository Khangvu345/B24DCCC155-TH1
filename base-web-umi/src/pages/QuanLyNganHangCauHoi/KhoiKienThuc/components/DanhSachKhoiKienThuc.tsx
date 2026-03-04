import { Button, Modal, Table, Popconfirm, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormKhoiKienThuc from './FormKhoiKienThuc';

const DanhSachKhoiKienThuc = () => {
    const { data, loading, fetchKhoiKienThuc, setRow, isEdit, setVisible, setIsEdit, visible, handleDelete } = useModel('quanlynganhangcauhoi.khoiKienThuc');

    useEffect(() => {
        fetchKhoiKienThuc();
    }, []);

    const columns = [
        {
            title: 'Tên Khối Kiến Thức',
            dataIndex: 'ten',
            key: 'ten',
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
                        title="Bạn có chắc chắn muốn xóa?"
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
                title={isEdit ? 'Cập nhật Khối Kiến Thức' : 'Thêm mới Khối Kiến Thức'}
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <FormKhoiKienThuc />
            </Modal>
        </div>
    );
};

export default DanhSachKhoiKienThuc;
