import { getAuthorProfile } from '@/services/Blog/author';
import type { AuthorProfile } from '@/types/blog';
import { Avatar, Card, List, Space, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Paragraph, Text, Link } = Typography;

const BlogAbout: React.FC = () => {
	const [profile, setProfile] = useState<AuthorProfile | null>(null);

	const normalizeProfile = (data?: AuthorProfile | null): AuthorProfile => ({
		name: data?.name ?? 'Chưa cập nhật',
		avatarUrl: data?.avatarUrl ?? '',
		bio: data?.bio ?? '',
		skills: data?.skills ?? [],
		socials: data?.socials ?? [],
	});

	useEffect(() => {
		const fetchProfile = async () => {
			const data = await getAuthorProfile();
			setProfile(normalizeProfile(data));
		};
		fetchProfile();
	}, []);

	if (!profile) {
		return <Card loading />;
	}

	return (
		<Card>
			<Space direction='vertical' size={16} style={{ width: '100%' }}>
				<Space size={16} align='center'>
					<Avatar size={96} src={profile.avatarUrl} />
					<Space direction='vertical' size={4}>
						<Title level={3} style={{ margin: 0 }}>
							{profile.name}
						</Title>
						<Text type='secondary'>Tác giả blog</Text>
					</Space>
				</Space>
				<Paragraph>{profile.bio}</Paragraph>
				<Space size={[6, 6]} wrap>
					{profile.skills.map((skill) => (
						<Tag key={skill}>{skill}</Tag>
					))}
				</Space>
				<List
					header='Liên kết mạng xã hội'
					dataSource={profile.socials}
					renderItem={(item) => (
						<List.Item>
							<Link href={item.url} target='_blank'>
								{item.label}
							</Link>
						</List.Item>
					)}
				/>
			</Space>
		</Card>
	);
};

export default BlogAbout;
