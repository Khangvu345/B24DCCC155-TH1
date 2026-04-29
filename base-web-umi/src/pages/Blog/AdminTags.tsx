import { createTag, deleteTag, getTags, updateTag } from '@/services/Blog/tags';
import type { TagItem } from '@/types/blog';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Popconfirm, Space, Table, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';

const AdminTags: React.FC = () => {
	const [tags, setTags] = useState<TagItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingTag, setEditingTag] = useState<TagItem | null>(null);
	const [saving, setSaving] = useState(false);
	const [form] = Form.useForm();

	const fetchTags = async () => {
		setLoading(true);
		try {
			const response = await getTags();
			setTags(response.data ?? []);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTags();
	}, []);

	const openModal = (tag?: TagItem) => {
		setEditingTag(tag ?? null);
		setModalOpen(true);
		form.setFieldsValue({ name: tag?.name ?? '' });
	};

	const handleSubmit = async () => {
		const values = await form.validateFields();
		setSaving(true);
		try {
			if (editingTag) {
				await updateTag(editingTag.id, { name: values.name });
				message.success('Cập nhật thẻ thành công');
			} else {
				await createTag({ name: values.name });
				message.success('Tạo thẻ thành công');
			}
			setModalOpen(false);
			setEditingTag(null);
			form.resetFields();
			fetchTags();
		} finally {
			setSaving(false);
		}
	};

	const columns = [
		{
			title: 'Tên thẻ',
			dataIndex: 'name',
			key: 'name',
			render: (value: string) => <Tag color='blue'>{value}</Tag>,
		},
		{
			title: 'Số bài viết',
			dataIndex: 'count',
			key: 'count',
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: TagItem) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => openModal(record)} />
					<Popconfirm
						title='Xóa thẻ này?'
						onConfirm={async () => {
							await deleteTag(record.id);
							message.success('Đã xóa thẻ');
							fetchTags();
						}}
					>
						<Button danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<Card>
			<Space direction='vertical' size={16} style={{ width: '100%' }}>
				<Button type='primary' icon={<PlusOutlined />} onClick={() => openModal()}>
					Thêm thẻ
				</Button>
				<Table rowKey='id' columns={columns} dataSource={tags} loading={loading} pagination={false} />
			</Space>
			<Modal
				visible={modalOpen}
				onCancel={() => {
					setModalOpen(false);
					setEditingTag(null);
				}}
				onOk={handleSubmit}
				confirmLoading={saving}
				okText='Lưu'
				cancelText='Hủy'
				title={editingTag ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới'}
				destroyOnClose
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='name' label='Tên thẻ' rules={[{ required: true, message: 'Nhập tên thẻ' }]}>
						<Input placeholder='Ví dụ: React' />
					</Form.Item>
				</Form>
			</Modal>
		</Card>
	);
};

export default AdminTags;
