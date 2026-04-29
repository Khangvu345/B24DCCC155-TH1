import axios from '@/utils/axios';
import type { AuthorProfile } from '@/types/blog';

export const getAuthorProfile = async () => {
	const response = await axios.get<AuthorProfile>('/api/author');
	return response.data;
};
