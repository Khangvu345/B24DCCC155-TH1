export type PostStatus = 'draft' | 'published';

export interface AuthorProfile {
	name: string;
	avatarUrl: string;
	bio: string;
	skills: string[];
	socials: Array<{ label: string; url: string }>;
}

export interface TagItem {
	id: number;
	name: string;
	count?: number;
}

export interface BlogPost {
	id: number;
	title: string;
	slug: string;
	excerpt: string;
	contentMarkdown: string;
	coverUrl: string;
	author: string;
	tags: string[];
	status: PostStatus;
	createdAt: string;
	viewCount: number;
}

export interface PostListResponse {
	data: BlogPost[];
	total: number;
}
