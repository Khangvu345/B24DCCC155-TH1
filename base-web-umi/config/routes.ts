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
		path: '/blog',
		name: 'Blog',
		icon: 'ReadOutlined',
		routes: [
			{
				path: '/blog',
				exact: true,
				name: 'Trang chủ',
				component: './Blog',
			},
			{
				path: '/blog/posts/:id',
				name: 'Chi tiết bài viết',
				component: './Blog/Detail',
				hideInMenu: true,
			},
			{
				path: '/blog/about',
				name: 'Giới thiệu',
				component: './Blog/About',
			},
			{
				path: '/blog/admin/posts',
				name: 'Quản lý bài viết',
				component: './Blog/AdminPosts',
			},
			{
				path: '/blog/admin/tags',
				name: 'Quản lý thẻ',
				component: './Blog/AdminTags',
			},
		],
	},
	{
		path: '/about',
		redirect: '/blog/about',
		hideInMenu: true,
	},
	{
		path: '/admin/posts',
		redirect: '/blog/admin/posts',
		hideInMenu: true,
	},
	{
		path: '/admin/tags',
		redirect: '/blog/admin/tags',
		hideInMenu: true,
	},
	{
		path: '/posts/:id',
		redirect: '/blog/posts/:id',
		hideInMenu: true,
	},
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
		exact: true,
		redirect: '/blog',
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
