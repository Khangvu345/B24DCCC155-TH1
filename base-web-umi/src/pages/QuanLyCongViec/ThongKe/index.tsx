import type { CongViec, ThongKeCongViec } from '@/pages/QuanLyCongViec/typing';
import { Alert, Button, Card, Col, Progress, Row, Spin, Statistic } from 'antd';
import { useEffect, useMemo } from 'react';
import { history, useModel } from 'umi';

type ThongKeModel = {
	tongQuan: ThongKeCongViec;
	loading: boolean;
	taiThongKe: () => Promise<ThongKeCongViec>;
};

type CongViecModel = {
	danhSach: CongViec[];
};

type AuthModel = {
	isLoggedIn: boolean;
	isAdmin: boolean;
};

const ThongKeCongViecPage = () => {
	const thongKeModel = useModel('quanlycongviec.thongKe' as any) as ThongKeModel;
	const congViecModel = useModel('quanlycongviec.congViec' as any) as CongViecModel;
	const authModel = useModel('quanlycongviec.auth' as any) as AuthModel;

	const dependencyKey = useMemo(
		() =>
			congViecModel.danhSach
				.map((item) => `${item.id}-${item.updatedAt || ''}`)
				.sort()
				.join('|'),
		[congViecModel.danhSach],
	);

	useEffect(() => {
		if (!authModel.isLoggedIn || !authModel.isAdmin) return;
		thongKeModel.taiThongKe().catch(() => undefined);
	}, [dependencyKey, authModel.isLoggedIn, authModel.isAdmin]);

	if (!authModel.isLoggedIn) {
		return (
			<Alert
				type='warning'
				showIcon
				message='Vui long dang nhap de xem thong ke cong viec'
				action={
					<Button type='link' onClick={() => history.push('/cong-viec/dang-nhap')}>
						Dang nhap
					</Button>
				}
			/>
		);
	}

	if (!authModel.isAdmin) {
		return <Alert type='error' showIcon message='Chi vai tro admin duoc phep xem thong ke cong viec' />;
	}

	return (
		<Spin spinning={thongKeModel.loading}>
			<Row gutter={[16, 16]}>
				<Col xs={24} md={8}>
					<Card bordered={false}>
						<Statistic title='Tong so cong viec' value={thongKeModel.tongQuan.tongSoCongViec} />
					</Card>
				</Col>

				<Col xs={24} md={8}>
					<Card bordered={false}>
						<Statistic title='So cong viec da hoan thanh' value={thongKeModel.tongQuan.soDaXong} valueStyle={{ color: '#3f8600' }} />
					</Card>
				</Col>

				<Col xs={24} md={8}>
					<Card bordered={false}>
						<Statistic title='Ti le hoan thanh' value={thongKeModel.tongQuan.tiLeHoanThanh} suffix='%' precision={2} />
					</Card>
				</Col>

				<Col xs={24}>
					<Card title='Phan bo trang thai cong viec' bordered={false}>
						<Row gutter={[16, 16]}>
							<Col xs={24} md={8}>
								<Statistic title='Chua lam' value={thongKeModel.tongQuan.soChuaLam} />
							</Col>
							<Col xs={24} md={8}>
								<Statistic title='Dang lam' value={thongKeModel.tongQuan.soDangLam} />
							</Col>
							<Col xs={24} md={8}>
								<Statistic title='Da xong' value={thongKeModel.tongQuan.soDaXong} />
							</Col>
						</Row>

						<div style={{ marginTop: 20 }}>
							<Progress
								percent={Math.min(100, Math.max(0, thongKeModel.tongQuan.tiLeHoanThanh))}
								status='active'
								strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
							/>
						</div>
					</Card>
				</Col>
			</Row>
		</Spin>
	);
};

export default ThongKeCongViecPage;
