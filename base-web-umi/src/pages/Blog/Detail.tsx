import MarkdownViewer from '@/components/Blog/MarkdownViewer';
import PostCard from '@/components/Blog/PostCard';
import { getPostById, getPosts, incrementPostView } from '@/services/Blog/posts';
import type { BlogPost } from '@/types/blog';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Row, Space, Spin, Tag, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { history, useParams } from 'umi';

const { Title, Text, Paragraph } = Typography;

const BlogDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [post, setPost] = useState<BlogPost | null>(null);
	const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			try {
				const data = await getPostById(id);
				setPost(data);
				if (data?.id) {
					incrementPostView(data.id);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [id]);

	useEffect(() => {
		const fetchRelated = async () => {
			if (!post || post.tags.length === 0) {
				setRelatedPosts([]);
				return;
			}
			const response = await getPosts({
				page: 1,
				pageSize: 6,
				tag: post.tags[0],
				status: 'published',
			});
			setRelatedPosts(response.data.filter((item) => item.id !== post.id));
		};
		fetchRelated();
	}, [post]);

	return (
		<Card>
			<Space direction='vertical' size={16} style={{ width: '100%' }}>
				<Button icon={<ArrowLeftOutlined />} onClick={() => history.push('/blog')}>
					Quay lại danh sách
				</Button>
				<Spin spinning={loading}>
					{!post ? (
						<Empty description='Không tìm thấy bài viết' />
					) : (
						<Space direction='vertical' size={16} style={{ width: '100%' }}>
							<img
								src={post.coverUrl}
								alt={post.title}
								style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 8 }}
							/>
							<Space direction='vertical' size={8} style={{ width: '100%' }}>
								<Title level={2}>{post.title}</Title>
								<Space size={8} wrap>
									<Text>{post.author}</Text>
									<Text type='secondary'>{moment(post.createdAt).format('DD/MM/YYYY')}</Text>
									<Text type='secondary'>Lượt xem: {post.viewCount}</Text>
								</Space>
								<Space size={[6, 6]} wrap>
									{post.tags.map((tag) => (
										<Tag key={`${post.id}-${tag}`}>{tag}</Tag>
									))}
								</Space>
							</Space>
							<Paragraph>{post.excerpt}</Paragraph>
							<MarkdownViewer content={post.contentMarkdown} />
						</Space>
					)}
				</Spin>
				<Space direction='vertical' size={12} style={{ width: '100%' }}>
					<Title level={4}>Bài viết liên quan</Title>
					{relatedPosts.length === 0 ? (
						<Empty description='Chưa có bài viết liên quan' />
					) : (
						<Row gutter={[16, 16]}>
							{relatedPosts.map((item) => (
								<Col xs={24} sm={12} lg={8} key={item.id}>
									<PostCard post={item} onClick={() => history.push(`/posts/${item.id}`)} />
								</Col>
							))}
						</Row>
					)}
				</Space>
			</Space>
		</Card>
	);
};

export default BlogDetail;
