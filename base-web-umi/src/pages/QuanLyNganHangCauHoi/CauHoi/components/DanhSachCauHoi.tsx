import { Button, Modal, Table, Popconfirm, Space, Select, Form } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import FormCauHoi from './FormCauHoi';

const DanhSachCauHoi = () => {
    const { data, loading, fetchCauHoi, setRow, isEdit, setVisible, setIsEdit, visible, handleDelete, setFilters } = useModel('quanlynganhangcauhoi.cauHoi');
    const { data: listMonHoc, fetchMonHoc } = useModel('quanlynganhangcauhoi.monHoc');
    const { data: listKhoiKienThuc, fetchKhoiKienThuc } = useModel('quanlynganhangcauhoi.khoiKienThuc');

    useEffect(() => {
        fetchCauHoi();
        if (listMonHoc.length === 0) fetchMonHoc();
        if (listKhoiKienThuc.length === 0) fetchKhoiKienThuc();
    }, []);

    const handleFilterChange = (changedValues: any, allValues: any) => {
        setFilters(allValues);
        fetchCauHoi(allValues);
    };

    const columns = [

        {
            title: 'Nội dung',
            dataIndex: 'noiDung',
            key: 'noiDung',
            width: '30%'
        },
        {
            title: 'Môn Học',
            dataIndex: 'monHocId',
            key: 'monHocId',
            render: (val: any) => typeof val === 'object' ? val?.tenMonHoc : listMonHoc.find((m: any) => m.id === val)?.tenMonHoc || val
        },
        {
            title: 'Khối Kiến Thức',
            dataIndex: 'khoiKienThucId',
            key: 'khoiKienThucId',
            render: (val: any) => typeof val === 'object' ? val?.ten : listKhoiKienThuc.find((k: any) => k.id === val)?.ten || val
        },
        {
            title: 'Mức Độ Khó',
            dataIndex: 'mucDo',
            key: 'mucDo',
            render: (val: string) => ({ 'de': 'Dễ', 'trungBinh': 'Trung bình', 'kho': 'Khó', 'ratKho': 'Rất khó' }[val] || val)
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
                        title="Bạn có chắc chắn muốn xóa câu hỏi này?"
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
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <Form layout="inline" onValuesChange={handleFilterChange}>
                    <Form.Item name="monHocId" label="Môn học">
                        <Select
                            allowClear
                            style={{ width: 200 }}
                            placeholder="Chọn môn học"
                            options={listMonHoc.map((m: any) => ({ value: m.id, label: m.tenMonHoc }))}
                        />
                    </Form.Item>
                    <Form.Item name="khoiKienThucId" label="Khối kiến thức">
                        <Select
                            allowClear
                            style={{ width: 200 }}
                            placeholder="Chọn khối kiến thức"
                            options={listKhoiKienThuc.map((k: any) => ({ value: k.id, label: k.ten }))}
                        />
                    </Form.Item>
                    <Form.Item name="mucDo" label="Mức độ khó">
                        <Select
                            allowClear
                            style={{ width: 150 }}
                            placeholder="Chọn mức độ khó"
                            options={[
                                { value: 'de', label: 'Dễ' },
                                { value: 'trungBinh', label: 'Trung bình' },
                                { value: 'kho', label: 'Khó' },
                                { value: 'ratKho', label: 'Rất khó' },
                            ]}
                        />
                    </Form.Item>
                </Form>
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
                width={700}
                title={isEdit ? 'Cập nhật Câu Hỏi' : 'Thêm mới Câu Hỏi'}
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <FormCauHoi />
            </Modal>
        </div>
    );
};

export default DanhSachCauHoi;
