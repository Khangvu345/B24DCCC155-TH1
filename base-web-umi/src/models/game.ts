import { useState } from 'react';
export default () => {
	// Hàm tạo số bí mật
	const taoSo = () => {
		return Math.floor(Math.random() * 100) + 1;
	};

	// Khởi tạo trạng thái
	const [soBiMat, setSoBiMat] = useState<number>(taoSo());
	const [soLanDoan, setSoLanDoan] = useState<number>(0);
	const [lichSu, setLichSu] = useState<number[]>([]);
	const [thongBao, setThongBao] = useState<string>('Hãy nhập số từ 1 - 100');
	const [trangThai, setTrangThai] = useState<'DANG_CHOI' | 'THANG' | 'THUA'>('DANG_CHOI');

	// Các hành động

	// Hàm kiểm tra số
	const kiemTraDuDoan = (soUserChon: number) => {
		if (trangThai !== 'DANG_CHOI') {
			return;
		}
		const newLichSu = [...lichSu, soUserChon];
		setLichSu(newLichSu);
		setSoLanDoan(soLanDoan + 1);

		if (soUserChon === soBiMat) {
			setThongBao('Chúc mừng bạn đã đoán đúng');
			setTrangThai('THANG');
		} else if (soLanDoan + 1 >= 10) {
			setThongBao(`Bạn đã hết lượt! Số đúng là ${soBiMat}`);
			setTrangThai('THUA');
		} else if (soUserChon < soBiMat) {
			setThongBao('Bạn đoán quá thấp');
		} else {
			setThongBao('Bạn đoán quá cao');
		}
	};

	// Hàm reset game
	const resetGame = () => {
		setSoBiMat(taoSo());
		setSoLanDoan(0);
		setLichSu([]);
		setThongBao('Hãy nhập số từ 1 - 100');
		setTrangThai('DANG_CHOI');
	};
	return {
		soBiMat,
		soLanDoan,
		lichSu,
		thongBao,
		trangThai,
		kiemTraDuDoan,
		resetGame,
	};
};
