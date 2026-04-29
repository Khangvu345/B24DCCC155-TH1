import PostCard from '@/components/Blog/PostCard';
import TagList from '@/components/Blog/TagList';
import { getPosts } from '@/services/Blog/posts';
import { getTags } from '@/services/Blog/tags';
import type { BlogPost, TagItem } from '@/types/blog';
import { Card, Col, Empty, Input, Pagination, Row, Space, Spin, Typography } from 'antd';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';
import { history } from 'umi';

const { Title, Text } = Typography;

const BlogHome: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [tags, setTags] = useState<TagItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(9);
	const [searchInput, setSearchInput] = useState('');
	const [keyword, setKeyword] = useState('');
	const [activeTag, setActiveTag] = useState<string | undefined>();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchTags = async () => {
			const response = await getTags();
			setTags(response.data ?? []);
		};
		fetchTags();
	}, []);

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setKeyword(value);
				setPage(1);
			}, 300),
		[],
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await getPosts({
					page,
					pageSize,
					q: keyword,
					tag: activeTag,
					status: 'published',
				});
				setPosts(response.data ?? []);
				setTotal(response.total ?? 0);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, [page, pageSize, keyword, activeTag]);

	return (
		<Card>
			<Space direction='vertical' size={16} style={{ width: '100%' }}>
				<Space direction='vertical' size={8} style={{ width: '100%' }}>
					<Title level={3}>Blog cá nhân</Title>
					<Text type='secondary'>Chia sẻ kiến thức, trải nghiệm và góc nhìn cá nhân.</Text>
				</Space>
				<Input
					placeholder='Tìm kiếm bài viết...'
					value={searchInput}
					onChange={(event) => {
						const value = event.target.value;
						setSearchInput(value);
						debouncedSearch(value.trim());
					}}
					allowClear
				/>
				<TagList
					tags={tags}
					activeTag={activeTag}
					onSelect={(tag) => {
						setActiveTag(tag);
						setPage(1);
					}}
				/>
				<Spin spinning={loading}>
					{posts.length === 0 ? (
						<Empty description='Không có bài viết phù hợp' />
					) : (
						<Row gutter={[16, 16]}>
							{posts.map((post) => (
								<Col xs={24} sm={12} lg={8} key={post.id}>
									<PostCard
										post={post}
										onClick={() => history.push(`/posts/${post.id}`)}
									/>
								</Col>
							))}
						</Row>
					)}
				</Spin>
				<Pagination
					current={page}
					pageSize={pageSize}
					total={total}
					pageSizeOptions={['6', '9', '12']}
					showSizeChanger
					onChange={(nextPage, nextPageSize) => {
						setPage(nextPage);
						setPageSize(nextPageSize ?? pageSize);
					}}
				/>
			</Space>
		</Card>
	);
};

export default BlogHome;
