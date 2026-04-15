import type { CalendarCongViecEvent } from '@/services/QuanLyCongViec/typing';
import { layCalendarCongViec } from '@/services/QuanLyCongViec/congViec';
import { useState } from 'react';

export default () => {
	const [events, setEvents] = useState<CalendarCongViecEvent[]>([]);
	const [loading, setLoading] = useState(false);

	const taiDuLieuLich = async (): Promise<CalendarCongViecEvent[]> => {
		setLoading(true);
		try {
			const congViec = await layCalendarCongViec();
			const mapped: CalendarCongViecEvent[] = congViec.map((item) => {
				const start = new Date(item.deadline);
				const end = new Date(start.getTime() + 60 * 60 * 1000);

				return {
					id: item.id,
					title: `${item.tenCongViec} - ${item.nguoiDuocGiao}`,
					start,
					end,
					resource: item,
				};
			});

			setEvents(mapped);
			return mapped;
		} catch (error) {
			setEvents([]);
			return Promise.reject(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		events,
		setEvents,
		loading,
		taiDuLieuLich,
	};
};
