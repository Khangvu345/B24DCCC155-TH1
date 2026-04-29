import { author } from './Blog/author';
import { posts } from './Blog/posts';
import { tags } from './Blog/tags';

const normalizeBody = (body: any) => {
	if (!body) return {};
	if (typeof body === 'string') {
		try {
			return JSON.parse(body);
		} catch (error) {
			return {};
		}
	}
	return body;
};

const getNextId = (items: Array<{ id: number }>) => {
	return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
};

export default {
	'GET /api/author': (_req: any, res: any) => {
		res.json(author);
	},
	'GET /api/posts': (req: any, res: any) => {
		const { page = '1', pageSize = '9', tag, q, status } = req.query || {};
		const pageNumber = Number(page) || 1;
		const pageSizeNumber = Number(pageSize) || 9;
		const keyword = typeof q === 'string' ? q.toLowerCase() : '';
		const tagFilter = typeof tag === 'string' ? tag : undefined;
		const statusFilter = typeof status === 'string' ? status : undefined;

		const filtered = posts
			.filter((post) => (!statusFilter ? true : post.status === statusFilter))
			.filter((post) => (!tagFilter ? true : post.tags.includes(tagFilter)))
			.filter((post) => (!keyword ? true : post.title.toLowerCase().includes(keyword)))
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

		const total = filtered.length;
		const start = (pageNumber - 1) * pageSizeNumber;
		const data = filtered.slice(start, start + pageSizeNumber);

		res.json({ data, total });
	},
	'GET /api/posts/:id': (req: any, res: any) => {
		const id = Number(req.params.id);
		const post = posts.find((item) => item.id === id);
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		res.json(post);
	},
	'POST /api/posts': (req: any, res: any) => {
		const payload = normalizeBody(req.body);
		const newPost = {
			id: getNextId(posts),
			viewCount: 0,
			createdAt: payload.createdAt || new Date().toISOString(),
			...payload,
		};
		posts.unshift(newPost);
		res.json(newPost);
	},
	'PUT /api/posts/:id': (req: any, res: any) => {
		const id = Number(req.params.id);
		const payload = normalizeBody(req.body);
		const index = posts.findIndex((item) => item.id === id);
		if (index === -1) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		posts[index] = { ...posts[index], ...payload };
		res.json(posts[index]);
	},
	'DELETE /api/posts/:id': (req: any, res: any) => {
		const id = Number(req.params.id);
		const index = posts.findIndex((item) => item.id === id);
		if (index === -1) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		const [removed] = posts.splice(index, 1);
		res.json(removed);
	},
	'POST /api/posts/:id/view': (req: any, res: any) => {
		const id = Number(req.params.id);
		const post = posts.find((item) => item.id === id);
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		post.viewCount += 1;
		res.json(post);
	},
	'GET /api/tags': (_req: any, res: any) => {
		const tagCounts = tags.map((tag) => ({
			...tag,
			count: posts.filter((post) => post.tags.includes(tag.name)).length,
		}));
		res.json({ data: tagCounts });
	},
	'POST /api/tags': (req: any, res: any) => {
		const payload = normalizeBody(req.body);
		const newTag = { id: getNextId(tags), name: payload.name };
		tags.push(newTag);
		res.json(newTag);
	},
	'PUT /api/tags/:id': (req: any, res: any) => {
		const id = Number(req.params.id);
		const payload = normalizeBody(req.body);
		const index = tags.findIndex((item) => item.id === id);
		if (index === -1) {
			res.status(404).json({ message: 'Tag not found' });
			return;
		}
		tags[index] = { ...tags[index], name: payload.name };
		res.json(tags[index]);
	},
	'DELETE /api/tags/:id': (req: any, res: any) => {
		const id = Number(req.params.id);
		const index = tags.findIndex((item) => item.id === id);
		if (index === -1) {
			res.status(404).json({ message: 'Tag not found' });
			return;
		}
		const [removed] = tags.splice(index, 1);
		posts.forEach((post) => {
			post.tags = post.tags.filter((tagName) => tagName !== removed.name);
		});
		res.json(removed);
	},
};
