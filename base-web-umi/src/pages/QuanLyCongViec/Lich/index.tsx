import type { CalendarCongViecEvent, CongViec } from '@/services/QuanLyCongViec/typing';
import { Alert, Button, Card, Col, Row, Spin, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer, type EventProps, type Event } from 'react-big-calendar';
import { history, useModel } from 'umi';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type LichModel = {
	events: CalendarCongViecEvent[];
	loading: boolean;
	taiDuLieuLich: () => Promise<CalendarCongViecEvent[]>;
};

type CongViecModel = {
	danhSach: CongViec[];
};

type AuthModel = {
	isLoggedIn: boolean;
	isAdmin: boolean;
	isNhanVien: boolean;
};

const localizer = momentLocalizer(moment);

const MAU_TRANG_THAI: Record<string, string> = {
	ChuaLam: '#8c8c8c',
	DangLam: '#1677ff',
	DaXong: '#52c41a',
};

const LichCongViecPage = () => {
	const lichModel = useModel('quanlycongviec.lich' as any) as LichModel;
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
		if (!authModel.isLoggedIn || (!authModel.isAdmin && !authModel.isNhanVien)) return;
		lichModel.taiDuLieuLich().catch(() => undefined);
	}, [dependencyKey, authModel.isLoggedIn, authModel.isAdmin, authModel.isNhanVien]);

	if (!authModel.isLoggedIn) {
		return (
			<Alert
				type='warning'
				showIcon
				message='Vui long dang nhap de xem lich cong viec'
				action={
					<Button type='link' onClick={() => history.push('/cong-viec/dang-nhap')}>
						Dang nhap
					</Button>
				}
			/>
		);
	}

	if (!authModel.isAdmin && !authModel.isNhanVien) {
		return <Alert type='error' showIcon message='Ban khong co quyen truy cap lich cong viec' />;
	}

	const eventPropGetter = (event: Event) => {
		const qlcvEvent = event as CalendarCongViecEvent;
		const mauNen = MAU_TRANG_THAI[qlcvEvent.resource.trangThai] || '#1677ff';
		return {
			style: {
				backgroundColor: mauNen,
				borderRadius: 6,
				border: 'none',
				color: '#fff',
				padding: '2px 6px',
			},
		};
	};

	const EventLabel = ({ event }: EventProps<Event>) => {
		const qlcvEvent = event as CalendarCongViecEvent;
		return (
			<span>
				{qlcvEvent.resource.tenCongViec} ({qlcvEvent.resource.nguoiDuocGiao})
			</span>
		);
	};

	return (
		<Card title='Lich cong viec theo deadline' bordered={false}>
			<Row gutter={[12, 12]} style={{ marginBottom: 8 }}>
				<Col>
					<Tag color='#8c8c8c'>ChuaLam</Tag>
				</Col>
				<Col>
					<Tag color='#1677ff'>DangLam</Tag>
				</Col>
				<Col>
					<Tag color='#52c41a'>DaXong</Tag>
				</Col>
			</Row>

			<Alert
				showIcon
				type='info'
				style={{ marginBottom: 16 }}
				message='Lich hien thi deadline cua cong viec. Tieu de event gom ten cong viec va nguoi duoc giao.'
			/>

			<Spin spinning={lichModel.loading}>
				<div style={{ height: 700 }}>
					<Calendar
						localizer={localizer}
						events={lichModel.events}
						startAccessor='start'
						endAccessor='end'
						style={{ height: '100%' }}
						eventPropGetter={eventPropGetter}
						components={{ event: EventLabel }}
						messages={{
							today: 'Hom nay',
							previous: 'Truoc',
							next: 'Sau',
							month: 'Thang',
							week: 'Tuan',
							day: 'Ngay',
							agenda: 'Danh sach',
							date: 'Ngay',
							time: 'Gio',
							event: 'Cong viec',
							noEventsInRange: 'Khong co cong viec trong khoang nay',
						}}
					/>
				</div>
			</Spin>
		</Card>
	);
};

export default LichCongViecPage;
