import React, { useState } from 'react';
import { Card, Input, Button, List, Typography, Alert } from 'antd';
import { useModel } from 'umi'; // Hook kết nối Model
const { Title, Text } = Typography;

const GamePage = () => {
	// Kết nối với model 'game' (tên file model)
	const { thongBao, trangThai, soLanDoan, lichSu, kiemTraDuDoan, resetGame } = useModel('game');

	const [inputValue, setInputValue] = useState<string>('');
	const handleGuess = () => {
		const num = parseInt(inputValue);
		if (!isNaN(num)) {
			kiemTraDuDoan(num);
			setInputValue(''); // Reset ô input
		}
	};
	return (
		<Card title='Trò Chơi Đoán Số Từ 1 - 100' style={{ maxWidth: 1000, margin: '0 auto' }}>
			{/* Hiển thị thông báo */}
			<Alert
				message={thongBao}
				type={trangThai === 'THANG' ? 'success' : trangThai === 'THUA' ? 'error' : 'info'}
				showIcon
				style={{ marginBottom: 20 }}
			/>
			{/* Khu vực nhập liệu */}
			<div style={{ display: 'flex', gap: 10, marginBottom: 20, justifyContent: 'center' }}>
				<Input
					type='number'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='Nhập số dự đoán...'
					disabled={trangThai !== 'DANG_CHOI'}
					onPressEnter={handleGuess}
				/>
				<Button type='primary' onClick={handleGuess} disabled={trangThai !== 'DANG_CHOI'}>
					Đoán
				</Button>
				<Button onClick={resetGame}>Chơi lại</Button>
			</div>
			{/* Hiển thị lượt chơi */}
			<div style={{ marginBottom: 20 }}>
				<Text strong>Lượt đoán: {soLanDoan}/10</Text>
			</div>
			{/* Lịch sử đoán */}
			<List
				header={<div>Lịch sử đoán</div>}
				bordered
				dataSource={lichSu}
				renderItem={(item, index) => (
					<List.Item>
						<Text>
							Lần {index + 1}: {item}
						</Text>
					</List.Item>
				)}
			/>
		</Card>
	);
};
export default GamePage;
