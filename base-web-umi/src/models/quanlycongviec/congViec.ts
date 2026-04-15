import type { TFilter } from '@/components/Table/typing';
import useInitModel from '@/hooks/useInitModel';
import type { BoLocCongViec, CongViec, TrangThaiCongViec } from '@/services/QuanLyCongViec/typing';
import {
	capNhatCongViec,
	capNhatTrangThaiCongViec,
	getCongViecPage,
	layCongViecCuaToi,
	layNguoiDuocGiao,
	taoCongViec,
	xoaCongViec,
} from '@/services/QuanLyCongViec/congViec';
import { message } from 'antd';
import { useState } from 'react';

const taoCondition = (boLoc?: BoLocCongViec): Partial<CongViec> & BoLocCongViec => ({
	keyword: boLoc?.keyword?.trim() || undefined,
	trangThai: boLoc?.trangThai || undefined,
	nguoiDuocGiao: boLoc?.nguoiDuocGiao || undefined,
});

export default () => {
	const initModel = useInitModel<CongViec>('api/cong-viec', undefined, undefined, '');
	const [boLoc, setBoLoc] = useState<BoLocCongViec>({});
	const [myTasks, setMyTasks] = useState<CongViec[]>([]);

	const getModel = async (
		paramCondition?: Partial<CongViec>,
		filterParams?: TFilter<CongViec>[],
		sortParam?: { [k in keyof CongViec]?: 1 | -1 },
		paramPage?: number,
		paramLimit?: number,
	): Promise<CongViec[]> => {
		initModel.setLoading(true);
		try {
			const mergedCondition = {
				...(initModel.condition ?? {}),
				...taoCondition(boLoc),
				...(paramCondition ?? {}),
			} as Partial<CongViec> & BoLocCongViec;

			const mergedFilters: TFilter<CongViec>[] = [
				...(initModel.filters?.filter((item) => item.active !== false) ?? []),
				...(filterParams ?? []),
			];

			const pageData = await getCongViecPage({
				page: paramPage || initModel.page,
				limit: paramLimit || initModel.limit,
				condition: mergedCondition,
				filters: mergedFilters,
				sort: (sortParam || initModel.sort) as Record<string, 1 | -1 | undefined>,
			});

			initModel.setDanhSach(pageData.result);
			initModel.setTotal(pageData.total);
			return pageData.result;
		} catch (error) {
			return Promise.reject(error);
		} finally {
			initModel.setLoading(false);
		}
	};

	const getMyTasksModel = async (username?: string): Promise<CongViec[]> => {
		try {
			const data = await layCongViecCuaToi(username);
			setMyTasks(data);
			return data;
		} catch (error) {
			setMyTasks([]);
			return Promise.reject(error);
		}
	};

	const postModel = async (
		payload: Partial<CongViec>,
		getData?: () => Promise<CongViec[]>,
		closeModal?: boolean,
		messageText?: string,
	): Promise<CongViec> => {
		if (initModel.formSubmiting) return Promise.reject('Form submiting');
		initModel.setFormSubmiting(true);
		try {
			const created = await taoCongViec(payload);
			message.success(messageText ?? 'Them moi cong viec thanh cong');

			if (getData) await getData();
			else await getModel(undefined, undefined, undefined, initModel.page, initModel.limit);

			await getMyTasksModel();
			if (closeModal !== false) initModel.setVisibleForm(false);
			return created;
		} catch (error) {
			return Promise.reject(error);
		} finally {
			initModel.setFormSubmiting(false);
		}
	};

	const putModel = async (
		id: string | number,
		payload: Partial<CongViec>,
		getData?: () => Promise<CongViec[]>,
		notGet?: boolean,
		closeModal?: boolean,
		messageText?: string,
	): Promise<CongViec> => {
		if (initModel.formSubmiting) return Promise.reject('Form submiting');
		initModel.setFormSubmiting(true);
		try {
			const updated = await capNhatCongViec(String(id), payload);
			message.success(messageText ?? 'Cap nhat cong viec thanh cong');

			if (getData) await getData();
			else if (!notGet) await getModel(undefined, undefined, undefined, initModel.page, initModel.limit);

			await getMyTasksModel();
			if (closeModal !== false) initModel.setVisibleForm(false);
			return updated;
		} catch (error) {
			return Promise.reject(error);
		} finally {
			initModel.setFormSubmiting(false);
		}
	};

	const deleteModel = async (id: string | number, getData?: () => Promise<CongViec[]>): Promise<void> => {
		initModel.setLoading(true);
		try {
			await xoaCongViec(String(id));
			message.success('Xoa cong viec thanh cong');

			if (getData) await getData();
			else {
				const maxPage = Math.ceil((Math.max(initModel.total - 1, 0) || 1) / initModel.limit) || 1;
				const targetPage = initModel.page > maxPage ? maxPage : initModel.page;
				if (targetPage !== initModel.page) initModel.setPage(targetPage);
				await getModel(undefined, undefined, undefined, targetPage, initModel.limit);
			}

			await getMyTasksModel();
		} catch (error) {
			throw error;
		} finally {
			initModel.setLoading(false);
		}
	};

	const apDungBoLoc = (nextBoLoc: BoLocCongViec) => {
		setBoLoc(nextBoLoc);
		initModel.setCondition(taoCondition(nextBoLoc));
		initModel.setPage(1);
	};

	const resetBoLoc = () => {
		const empty: BoLocCongViec = {};
		setBoLoc(empty);
		initModel.setCondition(undefined);
		initModel.setPage(1);
	};

	const locTheoTrangThai = (trangThai?: TrangThaiCongViec) => {
		apDungBoLoc({ ...boLoc, trangThai });
	};

	const locTheoNguoiDuocGiao = (nguoiDuocGiao?: string) => {
		apDungBoLoc({ ...boLoc, nguoiDuocGiao });
	};

	const timTheoTuKhoa = (keyword?: string) => {
		apDungBoLoc({ ...boLoc, keyword: keyword?.trim() });
	};

	const capNhatNhanhTrangThai = async (id: string, trangThai: TrangThaiCongViec) => {
		await capNhatTrangThaiCongViec(id, trangThai);
		message.success('Da cap nhat trang thai cong viec');
		await getModel(undefined, undefined, undefined, initModel.page, initModel.limit);
		await getMyTasksModel();
	};

	const getNguoiDuocGiaoOptions = () => layNguoiDuocGiao();

	return {
		...initModel,
		boLoc,
		setBoLoc,
		myTasks,
		getModel,
		postModel,
		putModel,
		deleteModel,
		apDungBoLoc,
		resetBoLoc,
		locTheoTrangThai,
		locTheoNguoiDuocGiao,
		timTheoTuKhoa,
		getMyTasksModel,
		capNhatNhanhTrangThai,
		getNguoiDuocGiaoOptions,
	};
};
