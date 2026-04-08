import type { CongViec, NguoiDungDangNhap, TrangThaiCongViec } from '@/pages/QuanLyCongViec/typing';
import { Alert, Card, Empty, List, Select, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';

type CongViecModel = {
	myTasks: CongViec[];
	getMyTasksModel: (username?: string) => Promise<CongViec[]>;
	capNhatNhanhTrangThai: (id: string, trangThai: TrangThaiCongViec) => Promise<void>;
};

type AuthModel = {
	currentUser?: NguoiDungDangNhap;
	isLoggedIn: boolean;
};

const MAU_TRANG_THAI: Record<TrangThaiCongViec, string> = {
	ChuaLam: 'default',
	DangLam: 'processing',
	DaXong: 'success',
};

const TRANG_THAI_OPTIONS: { label: string; value: TrangThaiCongViec }[] = [
	{ label: 'Chua lam', value: 'ChuaLam' },
	{ label: 'Dang lam', value: 'DangLam' },
	{ label: 'Da xong', value: 'DaXong' },
];

const MyTaskPanel = () => {
	const congViecModel = useModel('quanlycongviec.congViec' as any) as CongViecModel;
	const authModel = useModel('quanlycongviec.auth' as any) as AuthModel;

	useEffect(() => {
		if (authModel.currentUser?.username) {
			congViecModel.getMyTasksModel(authModel.currentUser.username).catch(() => undefined);
		}
	}, [authModel.currentUser?.username]);

	if (!authModel.isLoggedIn || !authModel.currentUser?.username) {
		return (
			<Card title='Cong viec cua toi' size='small' style={{ marginBottom: 16 }}>
				<Alert type='warning' showIcon message='Vui long dang nhap de xem danh sach cong viec duoc giao' />
			</Card>
		);
	}

	return (
		<Card title='Cong viec cua toi' size='small' style={{ marginBottom: 16 }}>
			{congViecModel.myTasks.length ? (
				<List
					itemLayout='vertical'
					size='small'
					dataSource={congViecModel.myTasks}
					renderItem={(item) => (
						<List.Item
							actions={[
								<Space key='action'>
									<Typography.Text type='secondary'>Cap nhat nhanh:</Typography.Text>
									<Select<TrangThaiCongViec>
										value={item.trangThai}
										style={{ width: 130 }}
										onChange={(value) => congViecModel.capNhatNhanhTrangThai(item.id, value)}
										options={TRANG_THAI_OPTIONS}
									/>
								</Space>,
							]}
						>
							<List.Item.Meta
								title={
									<Space>
										<span>{item.tenCongViec}</span>
										<Tag color={MAU_TRANG_THAI[item.trangThai]}>{item.trangThai}</Tag>
									</Space>
								}
								description={`Deadline: ${moment(item.deadline).format('DD/MM/YYYY')}`}
							/>
						</List.Item>
					)}
				/>
			) : (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Ban chua co cong viec nao duoc giao' />
			)}
		</Card>
	);
};

export default MyTaskPanel;
