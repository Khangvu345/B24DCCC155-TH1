import type { BlogPost, PostStatus, TagItem } from '@/types/blog';
import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';

const { TextArea } = Input;

interface PostFormProps {
	open: boolean;
	tags: TagItem[];
	initialValues?: Partial<BlogPost>;
	onCancel: () => void;
	onSubmit: (values: Omit<BlogPost, 'id' | 'viewCount'>) => void;
	confirmLoading?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ open, tags, initialValues, onCancel, onSubmit, confirmLoading }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (open) {
			form.setFieldsValue(initialValues ?? {});
		}
	}, [open, initialValues, form]);

	return (
		<Modal
			visible={open}
			onCancel={onCancel}
			onOk={() => form.submit()}
			confirmLoading={confirmLoading}
			okText='Lưu'
			cancelText='Hủy'
			title={initialValues?.id ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
			destroyOnClose
		>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				<Form.Item name='title' label='Tiêu đề' rules={[{ required: true, message: 'Nhập tiêu đề' }]}>
					<Input placeholder='Tiêu đề bài viết' />
				</Form.Item>
				<Form.Item name='slug' label='Slug' rules={[{ required: true, message: 'Nhập slug' }]}>
					<Input placeholder='slug-bai-viet' />
				</Form.Item>
				<Form.Item name='excerpt' label='Tóm tắt' rules={[{ required: true, message: 'Nhập tóm tắt' }]}>
					<TextArea rows={3} placeholder='Tóm tắt ngắn' />
				</Form.Item>
				<Form.Item name='contentMarkdown' label='Nội dung' rules={[{ required: true, message: 'Nhập nội dung' }]}>
					<TextArea rows={6} placeholder='Nội dung Markdown' />
				</Form.Item>
				<Form.Item name='coverUrl' label='Ảnh đại diện' rules={[{ required: true, message: 'Nhập URL ảnh' }]}>
					<Input placeholder='https://...' />
				</Form.Item>
				<Form.Item name='tags' label='Thẻ' rules={[{ required: true, message: 'Chọn thẻ' }]}>
					<Select mode='multiple' placeholder='Chọn thẻ'>
						{tags.map((tag) => (
							<Select.Option key={tag.id} value={tag.name}>
								{tag.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Chọn trạng thái' }]}>
					<Select<PostStatus> placeholder='Chọn trạng thái'>
						<Select.Option value='draft'>Nháp</Select.Option>
						<Select.Option value='published'>Đã đăng</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default PostForm;
