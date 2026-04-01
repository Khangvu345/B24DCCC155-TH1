import { Button, Card, Col, DatePicker, Input, Row, Select, Space, Statistic, message } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import { tienVietNam } from '@/utils/utils';
import AddDiemDenDrawer from './AddDiemDenDrawer';
import DayColumn from './DayColumn';

const { RangePicker } = DatePicker;

const calcGiaDuKien = (item?: KeHoachDuLich.IDiemDen) => {
  if (!item) return 0;
  return item.giaDuKien ?? (item.chiPhiAnUong || 0) + (item.chiPhiLuuTru || 0) + (item.chiPhiDiChuyen || 0);
};

const LichTrinhPage = () => {
  const lichTrinhModel = useModel('kehoachdulich.lichTrinh' as any) as any;
  const diemDenModel = useModel('kehoachdulich.diemDen' as any) as any;

  const { getAllModel: getAllLichTrinh, postModel, putModel } = lichTrinhModel;
  const { getAllModel: getAllDiemDen, danhSach: diemDenList, loading: loadingDiemDen } = diemDenModel;

  const [planList, setPlanList] = useState<KeHoachDuLich.ILichTrinh[]>([]);
  const [plan, setPlan] = useState<KeHoachDuLich.ILichTrinh>({
    ten: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    ngay: [],
    tongNganSach: 0,
  });
  const [range, setRange] = useState<RangePickerProps['value']>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllDiemDen().catch((error: unknown) => console.log(error));
  }, []);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await getAllLichTrinh();
        const list = (res || []) as KeHoachDuLich.ILichTrinh[];
        setPlanList(list);

        const cachedId = localStorage.getItem('kehoachdulich.planId') || '';
        const found = list.find((item) => item._id === cachedId) || list[0];
        if (found) {
          setSelectedPlanId(found._id);
          setPlan(found);
          if (found.ngayBatDau && found.ngayKetThuc) {
            setRange([moment(found.ngayBatDau), moment(found.ngayKetThuc)]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadPlans();
  }, []);

  const diemDenMap = useMemo(() => {
    const map = new Map<string, KeHoachDuLich.IDiemDen>();
    (diemDenList || []).forEach((item: KeHoachDuLich.IDiemDen) => {
      if (item._id) map.set(item._id, { ...item, giaDuKien: calcGiaDuKien(item) });
    });
    return map;
  }, [diemDenList]);

  const buildDay = (ngay: string, diemDenIds: string[]): KeHoachDuLich.ILichTrinhNgay => {
    const diemDenItems = diemDenIds.map((id) => diemDenMap.get(id)).filter(Boolean) as KeHoachDuLich.IDiemDen[];
    const tongChiPhi = diemDenItems.reduce((sum, item) => sum + calcGiaDuKien(item), 0);
    const tongThoiGianDiChuyen = Math.max(0, diemDenIds.length - 1) * 45;

    return {
      ngay,
      diemDenIds,
      tongChiPhi,
      tongThoiGianDiChuyen,
    };
  };

  const buildDaysFromRange = (
    start: moment.Moment,
    end: moment.Moment,
    currentDays: KeHoachDuLich.ILichTrinhNgay[],
  ) => {
    const map: Record<string, KeHoachDuLich.ILichTrinhNgay> = {};
    currentDays.forEach((item) => {
      map[item.ngay] = item;
    });

    const days: KeHoachDuLich.ILichTrinhNgay[] = [];
    const cursor = start.clone();
    while (cursor.isSameOrBefore(end, 'day')) {
      const dateKey = cursor.format('YYYY-MM-DD');
      const exist = map[dateKey];
      days.push(buildDay(dateKey, exist?.diemDenIds || []));
      cursor.add(1, 'day');
    }

    return days;
  };

  const updatePlanDays = (days: KeHoachDuLich.ILichTrinhNgay[]) => {
    const tongNganSach = days.reduce((sum, item) => sum + (item.tongChiPhi || 0), 0);
    setPlan((prev) => ({
      ...prev,
      ngay: days,
      tongNganSach,
    }));
  };

  const handleRangeChange: RangePickerProps['onChange'] = (dates) => {
    if (!dates || !dates[0] || !dates[1]) {
      setRange(null);
      updatePlanDays([]);
      return;
    }

    const [start, end] = dates;
    setRange(dates);
    const days = buildDaysFromRange(start, end, plan.ngay || []);
    updatePlanDays(days);
    setSelectedDayIndex(0);
  };

  const handleAddDiemDen = (id: string) => {
    if (!id) return;

    setPlan((prev) => {
      const days = [...(prev.ngay || [])];
      if (!days[selectedDayIndex]) return prev;

      const day = days[selectedDayIndex];
      const nextIds = [...(day.diemDenIds || [])];
      if (!nextIds.includes(id)) nextIds.push(id);

      days[selectedDayIndex] = buildDay(day.ngay, nextIds);
      const tongNganSach = days.reduce((sum, item) => sum + (item.tongChiPhi || 0), 0);

      return {
        ...prev,
        ngay: days,
        tongNganSach,
      };
    });
  };

  const handleMove = (dayIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    setPlan((prev) => {
      const days = [...(prev.ngay || [])];
      const day = days[dayIndex];
      if (!day) return prev;

      const ids = [...(day.diemDenIds || [])];
      const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
      if (targetIndex < 0 || targetIndex >= ids.length) return prev;

      const temp = ids[itemIndex];
      ids[itemIndex] = ids[targetIndex];
      ids[targetIndex] = temp;

      days[dayIndex] = buildDay(day.ngay, ids);
      const tongNganSach = days.reduce((sum, item) => sum + (item.tongChiPhi || 0), 0);

      return {
        ...prev,
        ngay: days,
        tongNganSach,
      };
    });
  };

  const handleRemove = (dayIndex: number, itemIndex: number) => {
    setPlan((prev) => {
      const days = [...(prev.ngay || [])];
      const day = days[dayIndex];
      if (!day) return prev;

      const ids = [...(day.diemDenIds || [])];
      ids.splice(itemIndex, 1);
      days[dayIndex] = buildDay(day.ngay, ids);

      const tongNganSach = days.reduce((sum, item) => sum + (item.tongChiPhi || 0), 0);

      return {
        ...prev,
        ngay: days,
        tongNganSach,
      };
    });
  };

  const planOptions = planList.map((item) => ({ label: item.ten, value: item._id || '' }));

  const handleSelectPlan = (id?: string) => {
    if (!id) {
      handleCreateNew();
      return;
    }

    const selected = planList.find((item) => item._id === id);
    if (!selected) return;
    setSelectedPlanId(id);
    setPlan(selected);
    if (selected.ngayBatDau && selected.ngayKetThuc) {
      setRange([moment(selected.ngayBatDau), moment(selected.ngayKetThuc)]);
    }
    localStorage.setItem('kehoachdulich.planId', id);
  };

  const handleCreateNew = () => {
    setSelectedPlanId(undefined);
    setPlan({ ten: '', ngayBatDau: '', ngayKetThuc: '', ngay: [], tongNganSach: 0 });
    setRange(null);
  };

  const handleSave = async () => {
    if (!plan.ten) {
      message.warning('Vui lòng nhập tên lịch trình');
      return;
    }
    if (!range || !range[0] || !range[1]) {
      message.warning('Vui lòng chọn ngày bắt đầu và kết thúc');
      return;
    }

    const [startDate, endDate] = range;
    const payload: KeHoachDuLich.ILichTrinh = {
      ...plan,
      ngayBatDau: startDate.startOf('day').toISOString(),
      ngayKetThuc: endDate.endOf('day').toISOString(),
      ngay: plan.ngay || [],
      tongNganSach: plan.tongNganSach || 0,
    };

    setSaving(true);
    try {
      if (plan._id) {
        await putModel(plan._id, payload, undefined, true, true, 'Cập nhật lịch trình thành công');
      } else {
        const res = await postModel(payload, undefined, true, 'Tạo lịch trình thành công');
        if (res?._id) {
          payload._id = res._id;
          setSelectedPlanId(res._id);
          localStorage.setItem('kehoachdulich.planId', res._id);
        }
      }

      const updatedList = (await getAllLichTrinh()) as KeHoachDuLich.ILichTrinh[];
      setPlanList(updatedList || []);
      if (payload._id) {
        const reload = updatedList.find((item) => item._id === payload._id);
        if (reload) setPlan(reload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const totalTravel = plan.ngay?.reduce((sum, item) => sum + (item.tongThoiGianDiChuyen || 0), 0) || 0;

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} md={8}>
            <Space direction="vertical" size={6} style={{ width: '100%' }}>
              <span>Chọn lịch trình</span>
              <Select
                options={planOptions}
                value={selectedPlanId}
                placeholder="Chọn lịch trình"
                onChange={handleSelectPlan}
                allowClear
                showSearch
                optionFilterProp="label"
              />
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Space direction="vertical" size={6} style={{ width: '100%' }}>
              <span>Tên lịch trình</span>
              <Input value={plan.ten} onChange={(e) => setPlan((prev) => ({ ...prev, ten: e.target.value }))} />
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Space direction="vertical" size={6} style={{ width: '100%' }}>
              <span>Khoảng ngày</span>
              <RangePicker style={{ width: '100%' }} value={range} onChange={handleRangeChange} />
            </Space>
          </Col>
        </Row>
        <Space style={{ marginTop: 12 }}>
          <Button onClick={handleCreateNew}>Tạo lịch trình mới</Button>
          <Button type="primary" loading={saving} onClick={handleSave}>
            Lưu lịch trình
          </Button>
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card>
            <Statistic title="Tổng ngân sách dự kiến" value={tienVietNam(plan.tongNganSach || 0)} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card>
            <Statistic title="Tổng thời gian di chuyển" value={`${totalTravel} phút`} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {plan.ngay?.map((day, index) => {
          const items = (day.diemDenIds || [])
            .map((id) => diemDenMap.get(id))
            .filter(Boolean) as KeHoachDuLich.IDiemDen[];

          return (
            <Col xs={24} md={12} xl={8} key={day.ngay}>
              <DayColumn
                ngay={day.ngay}
                items={items}
                tongChiPhi={day.tongChiPhi}
                tongThoiGianDiChuyen={day.tongThoiGianDiChuyen}
                onAdd={() => {
                  setSelectedDayIndex(index);
                  setDrawerVisible(true);
                }}
                onMove={(itemIndex, direction) => handleMove(index, itemIndex, direction)}
                onRemove={(itemIndex) => handleRemove(index, itemIndex)}
              />
            </Col>
          );
        })}
      </Row>

      <AddDiemDenDrawer
        visible={drawerVisible}
        loading={loadingDiemDen}
        data={diemDenList || []}
        selectedIds={plan.ngay?.[selectedDayIndex]?.diemDenIds || []}
        onAdd={(id) => handleAddDiemDen(id)}
        onClose={() => setDrawerVisible(false)}
      />
    </div>
  );
};

export default LichTrinhPage;
