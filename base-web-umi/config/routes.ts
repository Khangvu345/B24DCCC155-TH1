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
