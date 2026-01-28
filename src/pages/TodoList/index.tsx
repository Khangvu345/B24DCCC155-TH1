import React, { useState } from 'react';
import { Card, Input, Button, List, Typography, Checkbox, Modal, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const { Text } = Typography;

const TodoListPage = () => {
	const { danhSachTodo, themCongViec, xoaCongViec, doiTrangThai, suaCongViec } = useModel('todo');
	const [noiDungMoi, setNoiDungMoi] = useState('');
	const [dangSuaId, setDangSuaId] = useState<number | null>(null);
	const [noiDungSua, setNoiDungSua] = useState('');

	const xuLyThem = () => {
		if (noiDungMoi.trim()) {
			themCongViec(noiDungMoi);
			setNoiDungMoi('');
		}
	};

	const batDauSua = (item: TodoList.TodoItem) => {
		setDangSuaId(item.id);
		setNoiDungSua(item.tieuDe);
	};

	const luuSua = () => {
		if (dangSuaId !== null && noiDungSua.trim()) {
			suaCongViec(dangSuaId, noiDungSua);
			setDangSuaId(null);
			setNoiDungSua('');
		}
	};

	return (
		<Card title='Danh Sách Công Việc' style={{ maxWidth: 1000, margin: '0 auto' }}>
			<div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
				<Input
					placeholder='Nhập công việc cần làm...'
					value={noiDungMoi}
					onChange={(e) => setNoiDungMoi(e.target.value)}
					onPressEnter={xuLyThem}
				/>
				<Button type='primary' icon={<PlusOutlined />} onClick={xuLyThem}>
					Thêm
				</Button>
			</div>

			<List
				bordered
				dataSource={danhSachTodo}
				renderItem={(item) => (
					<List.Item
						actions={[
							<Tooltip title='Sửa'>
								<Button
									type='text'
									icon={<EditOutlined style={{ color: '#1890ff' }} />}
									onClick={() => batDauSua(item)}
								/>
							</Tooltip>,
							<Tooltip title='Xóa'>
								<Button
									type='text'
									danger
									icon={<DeleteOutlined />}
									onClick={() => {
										Modal.confirm({
											title: 'Xác nhận xóa',
											content: 'Bạn có chắc chắn muốn xóa công việc này không?',
											okText: 'Xóa',
											cancelText: 'Hủy',
											onOk: () => xoaCongViec(item.id),
										});
									}}
								/>
							</Tooltip>,
						]}
					>
						<List.Item.Meta
							avatar={<Checkbox checked={item.hoanThanh} onChange={() => doiTrangThai(item.id)} />}
							title={
								<Text delete={item.hoanThanh} style={{ color: item.hoanThanh ? '#bfbfbf' : 'inherit' }}>
									{item.tieuDe}
								</Text>
							}
						/>
					</List.Item>
				)}
			/>

			<Modal
				title='Chỉnh sửa công việc'
				visible={dangSuaId !== null}
				onOk={luuSua}
				onCancel={() => setDangSuaId(null)}
				okText='Lưu'
				cancelText='Hủy'
			>
				<Input value={noiDungSua} onChange={(e) => setNoiDungSua(e.target.value)} onPressEnter={luuSua} />
			</Modal>
		</Card>
	);
};

export default TodoListPage;
