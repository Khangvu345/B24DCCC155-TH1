import axios from '@/utils/axios';
import type { TagItem } from '@/types/blog';

export const getTags = async () => {
	const response = await axios.get<{ data: TagItem[] }>('/api/tags');
	return response.data;
};

export const createTag = async (payload: Pick<TagItem, 'name'>) => {
	const response = await axios.post<TagItem>('/api/tags', payload);
	return response.data;
};

export const updateTag = async (id: number, payload: Pick<TagItem, 'name'>) => {
	const response = await axios.put<TagItem>(`/api/tags/${id}`, payload);
	return response.data;
};

export const deleteTag = async (id: number) => {
	const response = await axios.delete(`/api/tags/${id}`);
	return response.data;
};
