import component from '@/locales/en-US/component';
import route from 'mock/route';

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/game',
		name: 'Game',
		component: './Game',
		icon: 'TrophyOutlined',
	},
	{
		path: '/todo',
		name: 'To Do List',
		component: './TodoList',
		icon: 'CheckSquareOutlined',
	},
	{
		path: '/oan-tu-ti',
		name: 'Oẳn tù tì',
		component: './OanTuTi',
		icon: 'ScissorOutlined',
	},
	{
		path: '/quan-ly-ngan-hang-cau-hoi',
		name: 'Quản lý ngân hàng câu hỏi',
		routes: [
			{
				name: 'Khối kiến thức',
				path: '/quan-ly-ngan-hang-cau-hoi/khoi-kien-thuc',
				component: './QuanLyNganHangCauHoi/KhoiKienThuc',
			},
			{
				name: 'Môn học',
				path: '/quan-ly-ngan-hang-cau-hoi/mon-hoc',
				component: './QuanLyNganHangCauHoi/MonHoc',
			},
			{
				name: 'Câu hỏi',
				path: '/quan-ly-ngan-hang-cau-hoi/cau-hoi',
				component: './QuanLyNganHangCauHoi/CauHoi',
			},
			{
				name: 'Đề thi',
				path: '/quan-ly-ngan-hang-cau-hoi/de-thi',
				component: './QuanLyNganHangCauHoi/DeThi',
			},
		],
		icon: 'QuestionOutlined',
	},
	{
		path: '/cham-soc-khach-hang',
		name: 'Chăm sóc khách hàng',
		routes: [
			{
				name: 'Quản lý lịch hẹn',
				path: '/cham-soc-khach-hang/quan-ly-lich-hen',
				component: './ChamSocKhachHang/components/QuanLyLichHen',
			},
			{
				name: 'Đánh giá dịch vụ và nhân viên',
				path: '/cham-soc-khach-hang/danh-gia-dich-vu-va-nhan-vien',
				component: './ChamSocKhachHang/components/DanhGiaDichVuVaNhanVien',
			},
			{
				name: 'Quản lý nhân viên và dịch vụ',
				path: '/cham-soc-khach-hang/quan-ly-nhan-vien-va-dich-vu',
				component: './ChamSocKhachHang/components/QuanLyNhanVienVaDichVu',
			},
			{
				name: 'Thống kê và báo cáo',
				path: '/cham-soc-khach-hang/thong-ke-va-bao-cao',
				component: './ChamSocKhachHang/components/ThongKeVaBaoCao',
			},
		],
		icon: 'QuestionOutlined',
	},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
