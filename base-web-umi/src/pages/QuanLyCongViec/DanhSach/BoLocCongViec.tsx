import type { BoLocCongViec, TrangThaiCongViec } from '@/pages/QuanLyCongViec/typing';
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

type CongViecModel = {
	boLoc: BoLocCongViec;
	apDungBoLoc: (boLoc: BoLocCongViec) => void;
	resetBoLoc: () => void;
	getNguoiDuocGiaoOptions: () => string[];
};

const TRANG_THAI_OPTIONS: { label: string; value: TrangThaiCongViec }[] = [
	{ label: 'Chua lam', value: 'ChuaLam' },
	{ label: 'Dang lam', value: 'DangLam' },
	{ label: 'Da xong', value: 'DaXong' },
];

const BoLocCongViecPanel = () => {
	const [form] = Form.useForm<BoLocCongViec>();
	const congViecModel = useModel('quanlycongviec.congViec' as any) as CongViecModel;

	useEffect(() => {
		form.setFieldsValue(congViecModel.boLoc);
	}, [congViecModel.boLoc.keyword, congViecModel.boLoc.nguoiDuocGiao, congViecModel.boLoc.trangThai]);

	const onSubmit = () => {
		const value = form.getFieldsValue();
		congViecModel.apDungBoLoc({
			keyword: value.keyword?.trim() || undefined,
			trangThai: value.trangThai,
			nguoiDuocGiao: value.nguoiDuocGiao,
		});
	};

	const onReset = () => {
		form.resetFields();
		congViecModel.resetBoLoc();
	};

	const dsNguoiDuocGiao = congViecModel.getNguoiDuocGiaoOptions();

	return (
		<Card title='Bo loc va tim kiem' size='small' style={{ marginBottom: 16 }}>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				<Row gutter={12}>
					<Col xs={24} md={10}>
						<Form.Item name='keyword' label='Tu khoa'>
							<Input allowClear placeholder='Tim theo ten cong viec...' />
						</Form.Item>
					</Col>
					<Col xs={24} md={7}>
						<Form.Item name='trangThai' label='Trang thai'>
							<Select allowClear placeholder='Tat ca trang thai' options={TRANG_THAI_OPTIONS} />
						</Form.Item>
					</Col>
					<Col xs={24} md={7}>
						<Form.Item name='nguoiDuocGiao' label='Nguoi duoc giao'>
							<Select
								allowClear
								placeholder='Tat ca thanh vien'
								options={dsNguoiDuocGiao.map((item) => ({ label: item, value: item }))}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Space>
					<Button type='primary' htmlType='submit'>
						Ap dung
					</Button>
					<Button onClick={onReset}>Reset bo loc</Button>
				</Space>
			</Form>
		</Card>
	);
};

export default BoLocCongViecPanel;
