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
		path: '/cong-viec',
		name: 'Quan ly cong viec',
		icon: 'ProfileOutlined',
		routes: [
			{
				name: 'Dang nhap',
				path: '/cong-viec/dang-nhap',
				component: './QuanLyCongViec/DangNhap',
			},
			{
				name: 'Danh sach',
				path: '/cong-viec/danh-sach',
				component: './QuanLyCongViec/DanhSach',
				access: 'qlcvAdmin',
			},
			{
				name: 'Cong viec cua toi',
				path: '/cong-viec/cua-toi',
				component: './QuanLyCongViec/CongViecCuaToi',
				access: 'qlcvNhanVien',
			},
			{
				name: 'Lich',
				path: '/cong-viec/lich',
				component: './QuanLyCongViec/Lich',
				access: 'qlcvNhanVienOrAdmin',
			},
			{
				name: 'Thong ke',
				path: '/cong-viec/thong-ke',
				component: './QuanLyCongViec/ThongKe',
				access: 'qlcvAdmin',
			},
		],
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
		path: '/quan-ly-cau-lac-bo',
		name: 'Quản lý CLB',
		routes: [
			{
				name: 'Danh sách CLB',
				path: '/quan-ly-cau-lac-bo/danh-sach',
				component: './QuanLyCauLacBo/DanhSachCLB',
			},
			{
				name: 'Đơn đăng ký',
				path: '/quan-ly-cau-lac-bo/don-dang-ky',
				component: './QuanLyCauLacBo/DonDangKy',
			},
			{
				name: 'Quản lý thành viên',
				path: '/quan-ly-cau-lac-bo/thanh-vien',
				component: './QuanLyCauLacBo/ThanhVien',
			},
			{
				name: 'Thống kê',
				path: '/quan-ly-cau-lac-bo/thong-ke',
				component: './QuanLyCauLacBo/ThongKe',
			},
		],
		icon: 'TeamOutlined',
	},
	{
		path: '/du-lich',
		name: 'Ứng dụng du lịch',
		routes: [
			{
				name: 'Khám phá',
				path: '/du-lich/kham-pha',
				component: './KeHoachDuLich/KhamPha',
			},
			{
				name: 'Lịch trình',
				path: '/du-lich/lich-trinh',
				component: './KeHoachDuLich/LichTrinh',
			},
			{
				name: 'Ngân sách',
				path: '/du-lich/ngan-sach',
				component: './KeHoachDuLich/NganSach',
			},
			{
				name: 'Admin - Điểm đến',
				path: '/du-lich/admin/diem-den',
				component: './KeHoachDuLich/Admin/DiemDen',
			},
			{
				name: 'Admin - Thống kê',
				path: '/du-lich/admin/thong-ke',
				component: './KeHoachDuLich/Admin/ThongKe',
			},
		],
		icon: 'CompassOutlined',
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
