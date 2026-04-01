import DonutChart from '@/components/Chart/DonutChart';
import { tienVietNam } from '@/utils/utils';
import { Alert, Button, Card, Col, InputNumber, Row, Select, Space, Statistic } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';

const NganSachPage = () => {
  const lichTrinhModel = useModel('kehoachdulich.lichTrinh' as any) as any;
  const nganSachModel = useModel('kehoachdulich.nganSach' as any) as any;

  const [planList, setPlanList] = useState<KeHoachDuLich.ILichTrinh[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [summary, setSummary] = useState<KeHoachDuLich.INganSachSummary | undefined>();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [budgetInput, setBudgetInput] = useState<number | null>(null);

  const fetchSummary = async (id: string) => {
    setLoading(true);
    try {
      const data = await nganSachModel.getSummary(id);
      setSummary(data);
      setBudgetInput(data?.tongNganSach ?? 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await lichTrinhModel.getAllModel();
        const list = (res || []) as KeHoachDuLich.ILichTrinh[];
        setPlanList(list);

        const cachedId = localStorage.getItem('kehoachdulich.planId') || '';
        const found = list.find((item) => item._id === cachedId) || list[0];
        if (found?._id) {
          setSelectedPlanId(found._id);
          fetchSummary(found._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadPlans();
  }, []);

  const planOptions = planList.map((item) => ({ label: item.ten, value: item._id || '' }));

  const handleSelectPlan = (id?: string) => {
    if (!id) {
      setSelectedPlanId(undefined);
      setSummary(undefined);
      return;
    }

    setSelectedPlanId(id);
    localStorage.setItem('kehoachdulich.planId', id);
    fetchSummary(id);
  };

  const handleUpdate = async () => {
    if (!selectedPlanId) return;
    setUpdating(true);
    try {
      const data = await nganSachModel.updateSummary(selectedPlanId, {
        tongNganSach: Number(budgetInput || 0),
      });
      setSummary(data);
      setBudgetInput(data?.tongNganSach ?? 0);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const phanBo = summary?.phanBo || { anUong: 0, diChuyen: 0, luuTru: 0, khac: 0 };

  const chartLabels = useMemo(() => ['Ăn uống', 'Di chuyển', 'Lưu trú', 'Khác'], []);
  const chartValues = useMemo(
    () => [phanBo.anUong || 0, phanBo.diChuyen || 0, phanBo.luuTru || 0, phanBo.khac || 0],
    [phanBo],
  );

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
              <span>Tổng ngân sách</span>
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                value={budgetInput ?? 0}
                onChange={(val) => setBudgetInput(val ?? 0)}
              />
            </Space>
          </Col>
          <Col xs={24} md={8}>
            <Button type="primary" onClick={handleUpdate} loading={updating}>
              Cập nhật ngân sách
            </Button>
          </Col>
        </Row>
      </Card>

      {summary?.vuotNganSach ? (
        <Alert
          type="warning"
          message="Vượt ngân sách"
          description="Chi tiêu hiện tại đã vượt quá tổng ngân sách. Cần điều chỉnh lại kế hoạch."
          style={{ marginBottom: 16 }}
        />
      ) : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Tổng ngân sách" value={tienVietNam(summary?.tongNganSach || 0)} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Đã sử dụng" value={tienVietNam(summary?.daSuDung || 0)} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Còn lại" value={tienVietNam(summary?.conLai || 0)} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} loading={loading}>
        <DonutChart
          xAxis={chartLabels}
          yAxis={[chartValues]}
          yLabel={['Chi tiêu']}
          colors={['#faad14', '#52c41a', '#1890ff', '#a0d911']}
          showTotal
          formatY={(val) => tienVietNam(val)}
        />
      </Card>
    </div>
  );
};

export default NganSachPage;
