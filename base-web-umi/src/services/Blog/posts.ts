import axios from '@/utils/axios';
import type { BlogPost, PostListResponse, PostStatus } from '@/types/blog';

export interface PostListParams {
	page?: number;
	pageSize?: number;
	q?: string;
	tag?: string;
	status?: PostStatus;
}

export const getPosts = async (params: PostListParams) => {
	const response = await axios.get<PostListResponse>('/api/posts', { params });
	return response.data;
};

export const getPostById = async (id: number | string) => {
	const response = await axios.get<BlogPost>(`/api/posts/${id}`);
	return response.data;
};

export const createPost = async (payload: Omit<BlogPost, 'id' | 'viewCount'>) => {
	const response = await axios.post<BlogPost>('/api/posts', payload);
	return response.data;
};

export const updatePost = async (id: number, payload: Partial<BlogPost>) => {
	const response = await axios.put<BlogPost>(`/api/posts/${id}`, payload);
	return response.data;
};

export const deletePost = async (id: number) => {
	const response = await axios.delete(`/api/posts/${id}`);
	return response.data;
};

export const incrementPostView = async (id: number) => {
	const response = await axios.post<BlogPost>(`/api/posts/${id}/view`);
	return response.data;
};
