import type { TagItem } from '@/types/blog';
import { Space, Tag } from 'antd';
import React from 'react';

interface TagListProps {
	tags: TagItem[];
	activeTag?: string;
	onSelect?: (tag?: string) => void;
	showAll?: boolean;
}

const TagList: React.FC<TagListProps> = ({ tags, activeTag, onSelect, showAll = true }) => {
	return (
		<Space size={[6, 8]} wrap>
			{showAll && (
				<Tag color={!activeTag ? 'blue' : undefined} onClick={() => onSelect?.(undefined)}>
					Tất cả
				</Tag>
			)}
			{tags.map((tag) => (
				<Tag
					key={tag.id}
					color={activeTag === tag.name ? 'blue' : undefined}
					onClick={() => onSelect?.(tag.name)}
				>
					{tag.name}
					{typeof tag.count === 'number' ? ` (${tag.count})` : ''}
				</Tag>
			))}
		</Space>
	);
};

export default TagList;
