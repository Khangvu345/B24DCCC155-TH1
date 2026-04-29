import PostForm from '@/components/Blog/PostForm';
import { createPost, deletePost, getPosts, updatePost } from '@/services/Blog/posts';
import { getTags } from '@/services/Blog/tags';
import type { BlogPost, PostStatus, TagItem } from '@/types/blog';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Input, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';

const { Option } = Select;

const statusLabel: Record<PostStatus, string> = {
	draft: 'Nháp',
	published: 'Đã đăng',
};

const AdminPosts: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [tags, setTags] = useState<TagItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [keyword, setKeyword] = useState('');
	const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all');
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(8);
	const [total, setTotal] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
	const [saving, setSaving] = useState(false);

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setKeyword(value);
				setPage(1);
			}, 300),
		[],
	);

	useEffect(() => {
		return () => debouncedSearch.cancel();
	}, [debouncedSearch]);

	useEffect(() => {
		const fetchTags = async () => {
			const response = await getTags();
			setTags(response.data ?? []);
		};
		fetchTags();
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await getPosts({
					page,
					pageSize,
					q: keyword,
					status: statusFilter === 'all' ? undefined : statusFilter,
				});
				setPosts(response.data ?? []);
				setTotal(response.total ?? 0);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, [page, pageSize, keyword, statusFilter]);

	const handleSubmit = async (values: Omit<BlogPost, 'id' | 'viewCount'>) => {
		setSaving(true);
		try {
			if (editingPost) {
				await updatePost(editingPost.id, {
					...editingPost,
					...values,
				});
				message.success('Cập nhật bài viết thành công');
			} else {
				await createPost({
					...values,
					author: 'Admin',
					createdAt: new Date().toISOString(),
				});
				message.success('Tạo bài viết thành công');
			}
			setModalOpen(false);
			setEditingPost(null);
			setPage(1);
		} finally {
			setSaving(false);
		}
	};

	const columns = [
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			key: 'title',
			width: 280,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: PostStatus) => (
				<Tag color={status === 'published' ? 'green' : 'orange'}>{statusLabel[status]}</Tag>
			),
		},
		{
			title: 'Thẻ',
			dataIndex: 'tags',
			key: 'tags',
			render: (postTags: string[]) => (
				<Space size={[4, 4]} wrap>
					{postTags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</Space>
			),
		},
		{
			title: 'Lượt xem',
			dataIndex: 'viewCount',
			key: 'viewCount',
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: BlogPost) => (
				<Space>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setEditingPost(record);
							setModalOpen(true);
						}}
					/>
					<Popconfirm
						title='Xóa bài viết này?'
						onConfirm={async () => {
							await deletePost(record.id);
							message.success('Đã xóa bài viết');
							setPage(1);
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
				<Space wrap size={12} style={{ width: '100%', justifyContent: 'space-between' }}>
					<Space wrap size={12}>
						<Input
							placeholder='Tìm kiếm theo tiêu đề'
							value={searchInput}
							onChange={(event) => {
								const value = event.target.value;
								setSearchInput(value);
								debouncedSearch(value.trim());
							}}
							allowClear
						/>
						<Select
							value={statusFilter}
							onChange={(value) => {
								setStatusFilter(value as PostStatus | 'all');
								setPage(1);
							}}
							style={{ minWidth: 180 }}
						>
							<Option value='all'>Tất cả trạng thái</Option>
							<Option value='draft'>Nháp</Option>
							<Option value='published'>Đã đăng</Option>
						</Select>
					</Space>
					<Button type='primary' icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
						Thêm bài viết
					</Button>
				</Space>
				<Table
					rowKey='id'
					columns={columns}
					dataSource={posts}
					loading={loading}
					pagination={{
						current: page,
						pageSize,
						total,
						onChange: (nextPage, nextPageSize) => {
							setPage(nextPage);
							setPageSize(nextPageSize ?? pageSize);
						},
					}}
				/>
			</Space>
			<PostForm
				open={modalOpen}
				tags={tags}
				initialValues={editingPost ?? undefined}
				onCancel={() => {
					setModalOpen(false);
					setEditingPost(null);
				}}
				onSubmit={handleSubmit}
				confirmLoading={saving}
			/>
		</Card>
	);
};

export default AdminPosts;
