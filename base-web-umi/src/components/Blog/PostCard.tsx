import type { BlogPost } from '@/types/blog';
import { Avatar, Card, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import React from 'react';

const { Paragraph, Text, Title } = Typography;

interface PostCardProps {
	post: BlogPost;
	onClick?: (post: BlogPost) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
	return (
		<Card
			hoverable
			cover={<img alt={post.title} src={post.coverUrl} style={{ height: 200, objectFit: 'cover' }} />}
			onClick={() => onClick?.(post)}
		>
			<Space direction='vertical' size={8} style={{ width: '100%' }}>
				<Title level={4} style={{ marginBottom: 0 }}>
					{post.title}
				</Title>
				<Paragraph ellipsis={{ rows: 2 }}>{post.excerpt}</Paragraph>
				<Space size={8} wrap>
					<Avatar size='small'>{post.author?.charAt(0).toUpperCase()}</Avatar>
					<Text>{post.author}</Text>
					<Text type='secondary'>{moment(post.createdAt).format('DD/MM/YYYY')}</Text>
				</Space>
				<Space size={[6, 6]} wrap>
					{post.tags.map((tag) => (
						<Tag key={`${post.id}-${tag}`}>{tag}</Tag>
					))}
				</Space>
			</Space>
		</Card>
	);
};

export default PostCard;
