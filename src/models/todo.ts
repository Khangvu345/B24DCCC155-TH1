import { useState, useEffect } from 'react';

export default () => {
	// Lấy dữ liệu từ localStorage khi khởi tạo
	const layDuLieuTuStorage = (): TodoList.TodoItem[] => {
		try {
			const duLieuLuu = localStorage.getItem('danhSachTodo');
			if (duLieuLuu) {
				return JSON.parse(duLieuLuu);
			}
		} catch (error) {
			console.error('Lỗi khi đọc localStorage:', error);
		}
		return [];
	};

	const [danhSachTodo, setDanhSachTodo] = useState<TodoList.TodoItem[]>(layDuLieuTuStorage());

	// Lưu vào localStorage mỗi khi danh sách thay đổi
	useEffect(() => {
		localStorage.setItem('danhSachTodo', JSON.stringify(danhSachTodo));
	}, [danhSachTodo]);

	// Thêm công việc mới
	const themCongViec = (tieuDe: string) => {
		if (!tieuDe.trim()) return;
		const congViecMoi: TodoList.TodoItem = {
			id: Date.now(),
			tieuDe: tieuDe.trim(),
			hoanThanh: false,
		};
		setDanhSachTodo([congViecMoi, ...danhSachTodo]);
	};

	// Xóa công việc
	const xoaCongViec = (id: number) => {
		setDanhSachTodo(danhSachTodo.filter((item) => item.id !== id));
	};

	// Thay đổi trạng thái hoàn thành
	const doiTrangThai = (id: number) => {
		setDanhSachTodo(danhSachTodo.map((item) => (item.id === id ? { ...item, hoanThanh: !item.hoanThanh } : item)));
	};

	// Chỉnh sửa tiêu đề công việc
	const suaCongViec = (id: number, tieuDeMoi: string) => {
		setDanhSachTodo(danhSachTodo.map((item) => (item.id === id ? { ...item, tieuDe: tieuDeMoi } : item)));
	};

	return {
		danhSachTodo,
		themCongViec,
		xoaCongViec,
		doiTrangThai,
		suaCongViec,
	};
};
