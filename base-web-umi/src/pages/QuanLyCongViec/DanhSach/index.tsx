import TableBase from '@/components/Table';
import type { IColumn } from '@/components/Table/typing';
import type { CongViec, MucDoUuTien, NguoiDungDangNhap, TrangThaiCongViec } from '@/services/QuanLyCongViec/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Alert, Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { history, useModel } from 'umi';
import BoLocCongViecPanel from './BoLocCongViec';
import CongViecFormModal from './CongViecFormModal';

type CongViecModel = {
	page: number;
	limit: number;
	deleteModel: (id: string | number, getData?: () => Promise<CongViec[]>) => Promise<void>;
	handleEdit: (record: CongViec) => void;
	getModel: () => Promise<CongViec[]>;
	getNguoiDuocGiaoOptions: () => string[];
};

type AuthModel = {
	currentUser?: NguoiDungDangNhap;
	isLoggedIn: boolean;
	isAdmin: boolean;
};

const MAU_UU_TIEN: Record<MucDoUuTien, string> = {
	Thap: 'green',
	TrungBinh: 'gold',
	Cao: 'red',
};

const MAU_TRANG_THAI: Record<TrangThaiCongViec, string> = {
	ChuaLam: 'default',
	DangLam: 'processing',
	DaXong: 'success',
};

const DanhSachCongViecPage = () => {
	const congViecModel = useModel('quanlycongviec.congViec' as any) as CongViecModel;
	const authModel = useModel('quanlycongviec.auth' as any) as AuthModel;

	if (!authModel.isLoggedIn) {
		return (
			<Alert
				type='warning'
				showIcon
				message='Vui long dang nhap de xem danh sach cong viec'
				action={
					<Button type='link' onClick={() => history.push('/cong-viec/dang-nhap')}>
						Dang nhap
					</Button>
				}
			/>
		);
	}

	if (!authModel.isAdmin) {
		return (
			<Alert
				type='error'
				showIcon
				message='Ban khong co quyen truy cap man hinh Danh sach cong viec'
				description='Chi vai tro admin duoc phep thao tac CRUD danh sach cong viec.'
			/>
		);
	}

	const dsNguoiDuocGiao = congViecModel.getNguoiDuocGiaoOptions();

	const columns: IColumn<CongViec>[] = [
		{
			title: 'Ten cong viec',
			dataIndex: 'tenCongViec',
			width: 280,
			filterType: 'string',
			sortable: true,
		},
		{
			title: 'Nguoi duoc giao',
			dataIndex: 'nguoiDuocGiao',
			width: 150,
			filterType: 'select',
			filterData: dsNguoiDuocGiao,
			sortable: true,
		},
		{
			title: 'Uu tien',
			dataIndex: 'mucDoUuTien',
			width: 120,
			filterType: 'select',
			filterData: [
				{ label: 'Thap', value: 'Thap' },
				{ label: 'Trung binh', value: 'TrungBinh' },
				{ label: 'Cao', value: 'Cao' },
			],
			render: (value: MucDoUuTien) => <Tag color={MAU_UU_TIEN[value]}>{value}</Tag>,
			sortable: true,
		},
		{
			title: 'Deadline',
			dataIndex: 'deadline',
			align: 'center',
			width: 120,
			sortable: true,
			render: (value: string) => moment(value).format('DD/MM/YYYY'),
		},
		{
			title: 'Trang thai',
			dataIndex: 'trangThai',
			width: 120,
			filterType: 'select',
			filterData: [
				{ label: 'Chua lam', value: 'ChuaLam' },
				{ label: 'Dang lam', value: 'DangLam' },
				{ label: 'Da xong', value: 'DaXong' },
			],
			render: (value: TrangThaiCongViec) => <Tag color={MAU_TRANG_THAI[value]}>{value}</Tag>,
			sortable: true,
		},
		{
			title: 'Thao tac',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (record: CongViec) => (
				<Space size='small'>
					<Tooltip title='Chinh sua'>
						<Button type='link' icon={<EditOutlined />} onClick={() => congViecModel.handleEdit(record)} />
					</Tooltip>
					<Tooltip title='Xoa'>
						<Popconfirm
							title='Ban co chac muon xoa cong viec nay?'
							onConfirm={() => congViecModel.deleteModel(record.id || record._id || '', congViecModel.getModel)}
						>
							<Button danger type='link' icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div>
			<BoLocCongViecPanel />
			<TableBase
				modelName='quanlycongviec.congViec'
				title='Danh sach cong viec'
				Form={CongViecFormModal}
				columns={columns}
				dependencies={[congViecModel.page, congViecModel.limit]}
				otherProps={{ size: 'middle' }}
			/>
		</div>
	);
};

export default DanhSachCongViecPage;
