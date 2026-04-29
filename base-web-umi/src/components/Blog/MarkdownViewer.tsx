import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
	content: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
	return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default MarkdownViewer;
