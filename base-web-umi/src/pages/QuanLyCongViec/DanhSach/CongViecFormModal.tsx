import type { CongViec, MucDoUuTien, TrangThaiCongViec } from '@/pages/QuanLyCongViec/typing';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useModel } from 'umi';

type CongViecModel = {
	record?: CongViec;
	edit: boolean;
	visibleForm: boolean;
	setVisibleForm: (visible: boolean) => void;
	postModel: (payload: Partial<CongViec>) => Promise<CongViec>;
	putModel: (id: string | number, payload: Partial<CongViec>) => Promise<CongViec>;
	formSubmiting: boolean;
	getNguoiDuocGiaoOptions: () => string[];
};

type CongViecFormData = {
	tenCongViec: string;
	nguoiDuocGiao: string;
	mucDoUuTien: MucDoUuTien;
	deadline: moment.Moment;
	trangThai: TrangThaiCongViec;
	moTa?: string;
};

const MUC_DO_OPTIONS: { label: string; value: MucDoUuTien }[] = [
	{ label: 'Thap', value: 'Thap' },
	{ label: 'Trung binh', value: 'TrungBinh' },
	{ label: 'Cao', value: 'Cao' },
];

const TRANG_THAI_OPTIONS: { label: string; value: TrangThaiCongViec }[] = [
	{ label: 'Chua lam', value: 'ChuaLam' },
	{ label: 'Dang lam', value: 'DangLam' },
	{ label: 'Da xong', value: 'DaXong' },
];

const CongViecFormModal = () => {
	const [form] = Form.useForm<CongViecFormData>();
	const congViecModel = useModel('quanlycongviec.congViec' as any) as CongViecModel;

	const dsNguoiDuocGiao = congViecModel.getNguoiDuocGiaoOptions();

	useEffect(() => {
		if (!congViecModel.visibleForm) {
			form.resetFields();
			return;
		}

		if (congViecModel.record?.id || congViecModel.record?._id) {
			form.setFieldsValue({
				tenCongViec: congViecModel.record.tenCongViec,
				nguoiDuocGiao: congViecModel.record.nguoiDuocGiao,
				mucDoUuTien: congViecModel.record.mucDoUuTien,
				deadline: congViecModel.record.deadline ? moment(congViecModel.record.deadline) : moment(),
				trangThai: congViecModel.record.trangThai,
				moTa: congViecModel.record.moTa,
			});
		} else {
			form.setFieldsValue({
				mucDoUuTien: 'TrungBinh',
				trangThai: 'ChuaLam',
				deadline: moment().add(1, 'day'),
				nguoiDuocGiao: dsNguoiDuocGiao[0],
			});
		}
	}, [congViecModel.record?._id, congViecModel.record?.id, congViecModel.visibleForm]);

	const onFinish = async (values: CongViecFormData) => {
		const payload: Partial<CongViec> = {
			tenCongViec: values.tenCongViec.trim(),
			nguoiDuocGiao: values.nguoiDuocGiao,
			mucDoUuTien: values.mucDoUuTien,
			deadline: values.deadline.toISOString(),
			trangThai: values.trangThai,
			moTa: values.moTa?.trim(),
		};

		const currentId = congViecModel.record?._id || congViecModel.record?.id;
		if (congViecModel.edit && currentId) {
			await congViecModel.putModel(currentId, payload);
			return;
		}

		await congViecModel.postModel(payload);
	};

	return (
		<Card title={congViecModel.edit ? 'Chinh sua cong viec' : 'Them moi cong viec'} bordered={false}>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item
					name='tenCongViec'
					label='Ten cong viec'
					rules={[
						{ required: true, message: 'Vui long nhap ten cong viec' },
						{ whitespace: true, message: 'Ten cong viec khong hop le' },
					]}
				>
					<Input placeholder='VD: Hoan thien module thong ke' />
				</Form.Item>

				<Form.Item
					name='nguoiDuocGiao'
					label='Nguoi duoc giao'
					rules={[{ required: true, message: 'Vui long chon nguoi duoc giao' }]}
				>
					<Select options={dsNguoiDuocGiao.map((item) => ({ label: item, value: item }))} />
				</Form.Item>

				<Form.Item
					name='mucDoUuTien'
					label='Muc do uu tien'
					rules={[{ required: true, message: 'Vui long chon muc do uu tien' }]}
				>
					<Select options={MUC_DO_OPTIONS} />
				</Form.Item>

				<Form.Item
					name='deadline'
					label='Deadline'
					rules={[{ required: true, message: 'Vui long chon deadline' }]}
				>
					<DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
				</Form.Item>

				<Form.Item
					name='trangThai'
					label='Trang thai'
					rules={[{ required: true, message: 'Vui long chon trang thai' }]}
				>
					<Select options={TRANG_THAI_OPTIONS} />
				</Form.Item>

				<Form.Item name='moTa' label='Mo ta'>
					<Input.TextArea rows={3} placeholder='Mo ta ngan ve cong viec' />
				</Form.Item>

				<div className='form-footer'>
					<Button loading={congViecModel.formSubmiting} type='primary' htmlType='submit'>
						{congViecModel.edit ? 'Luu thay doi' : 'Them moi'}
					</Button>
					<Button onClick={() => congViecModel.setVisibleForm(false)}>Huy</Button>
				</div>
			</Form>
		</Card>
	);
};

export default CongViecFormModal;
