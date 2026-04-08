import type { KieuLuuDangNhap, NguoiDungDangNhap } from '@/pages/QuanLyCongViec/typing';
import { CheckCircleOutlined, LockOutlined, LogoutOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Form, Input, Radio, Row, Space, Typography } from 'antd';
import { history, useModel } from 'umi';

type AuthModel = {
	currentUser?: NguoiDungDangNhap;
	loading: boolean;
	isLoggedIn: boolean;
	isAdmin: boolean;
	isNhanVien: boolean;
	login: (payload: { username: string; password: string; storageType: KieuLuuDangNhap }) => Promise<NguoiDungDangNhap>;
	logout: () => Promise<void>;
	taiKhoanMau: string[];
	matKhauMau: string;
};

type FormDangNhap = {
	username: string;
	password: string;
	storageType: KieuLuuDangNhap;
};

const DangNhapCongViecPage = () => {
	const [form] = Form.useForm<FormDangNhap>();
	const authModel = useModel('quanlycongviec.auth' as any) as AuthModel;

	const onFinish = async (values: FormDangNhap) => {
		const user = await authModel.login(values);
		if (user.role === 'admin') {
			history.push('/cong-viec/danh-sach');
			return;
		}
		history.push('/cong-viec/cua-toi');
	};

	const chuyenTrangTheoVaiTro = () => {
		if (authModel.currentUser?.role === 'admin') {
			history.push('/cong-viec/danh-sach');
			return;
		}
		if (authModel.currentUser?.role === 'nhanvien') {
			history.push('/cong-viec/cua-toi');
			return;
		}
		history.push('/cong-viec/lich');
	};

	return (
		<Row justify='center'>
			<Col xs={24} sm={20} md={16} lg={12} xl={10}>
				<Card title='Dang nhap quan ly cong viec' bordered={false}>
					{authModel.isLoggedIn && authModel.currentUser ? (
						<Alert
							style={{ marginBottom: 16 }}
							type='success'
							showIcon
							icon={<CheckCircleOutlined />}
							message={`Da dang nhap: ${authModel.currentUser.username}`}
							description={`Vai tro: ${authModel.currentUser.role}. Thoi gian dang nhap: ${new Date(authModel.currentUser.loginAt).toLocaleString('vi-VN')}`}
						/>
					) : null}

					<Form<FormDangNhap>
						form={form}
						layout='vertical'
						initialValues={{ storageType: 'localStorage' }}
						onFinish={onFinish}
					>
						<Form.Item
							label='Ten dang nhap'
							name='username'
							rules={[
								{ required: true, message: 'Vui long nhap ten dang nhap' },
								{ whitespace: true, message: 'Ten dang nhap khong hop le' },
							]}
						>
							<Input prefix={<UserOutlined />} placeholder='VD: anh.nguyen' />
						</Form.Item>

						<Form.Item
							label='Mat khau'
							name='password'
							rules={[{ required: true, message: 'Vui long nhap mat khau' }]}
						>
							<Input.Password prefix={<LockOutlined />} placeholder='Nhap mat khau' />
						</Form.Item>

						<Form.Item label='Kieu luu dang nhap' name='storageType'>
							<Radio.Group>
								<Radio value='localStorage'>Luu dai han (localStorage)</Radio>
								<Radio value='sessionStorage'>Chi trong phien (sessionStorage)</Radio>
							</Radio.Group>
						</Form.Item>

						<Form.Item style={{ marginBottom: 12 }}>
							<Space>
								<Button loading={authModel.loading} icon={<LoginOutlined />} type='primary' htmlType='submit'>
									Dang nhap
								</Button>
								<Button
									icon={<LogoutOutlined />}
									onClick={() => authModel.logout()}
									disabled={!authModel.isLoggedIn}
								>
									Dang xuat
								</Button>
								<Button onClick={chuyenTrangTheoVaiTro}>Di den man hinh theo vai tro</Button>
							</Space>
						</Form.Item>
					</Form>

					<Typography.Paragraph type='secondary' style={{ marginBottom: 0 }}>
						Tai khoan mau: {authModel.taiKhoanMau.join(', ')}
						<br />
						Mat khau mau: {authModel.matKhauMau}
						<br />
						Mat khau duoc hash SHA-256 truoc khi luu, khong luu plain text trong storage.
					</Typography.Paragraph>
				</Card>
			</Col>
		</Row>
	);
};

export default DangNhapCongViecPage;
