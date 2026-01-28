declare module Game {
	export interface State {
		soBiMat: number;
		soLanDoan: number;
		lichSu: number[];
		thongBao: string;
		trangThai: 'DANG_CHOI' | 'THANG' | 'THUA';
	}
}

export interface Models extends State {
	/**
	 * Kiểm tra số người dùng chọn có đúng với số bí mật không
	 * @param soUserChon Số người dùng chọn
	 */
	kiemTraDuDoan: (soUserChon: number) => void;
	/**
	 * Reset game
	 */
	resetGame: () => void;
}
