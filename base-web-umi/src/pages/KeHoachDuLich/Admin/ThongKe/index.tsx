import ColumnChart from '@/components/Chart/ColumnChart';
import DonutChart from '@/components/Chart/DonutChart';
import { tienVietNam } from '@/utils/utils';
import { Card, Col, Row, Statistic } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';

const ThongKePage = () => {
  const thongKeModel = useModel('kehoachdulich.thongKe' as any) as any;

  const [tongQuan, setTongQuan] = useState<KeHoachDuLich.IThongKeTongQuan>();
  const [theoThang, setTheoThang] = useState<KeHoachDuLich.IThongKeTheoThang[]>([]);
  const [chiTieu, setChiTieu] = useState<KeHoachDuLich.IPhanBoNganSach>();
  const [phoBien, setPhoBien] = useState<KeHoachDuLich.IDiemDenPhoBien[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [tongQuanRes, thangRes, chiTieuRes, phoBienRes] = await Promise.all([
          thongKeModel.getTongQuan(),
          thongKeModel.getLichTrinhTheoThang(),
          thongKeModel.getChiTieuTheoHangMuc(),
          thongKeModel.getDiemDenPhoBien(),
        ]);
        setTongQuan(tongQuanRes);
        setTheoThang(thangRes || []);
        setChiTieu(chiTieuRes);
        setPhoBien(phoBienRes || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const chartThangX = useMemo(() => theoThang.map((item) => item.thang), [theoThang]);
  const chartThangY = useMemo(() => [theoThang.map((item) => item.soLichTrinh)], [theoThang]);

  const chartPhoBienX = useMemo(() => phoBien.map((item) => item.ten), [phoBien]);
  const chartPhoBienY = useMemo(() => [phoBien.map((item) => item.soLuotChon)], [phoBien]);

  const phanBoLabels = ['Ăn uống', 'Di chuyển', 'Lưu trú', 'Khác'];
  const phanBoValues = [
    chiTieu?.anUong || 0,
    chiTieu?.diChuyen || 0,
    chiTieu?.luuTru || 0,
    chiTieu?.khac || 0,
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Số lịch trình" value={tongQuan?.soLichTrinh || 0} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Doanh thu" value={tienVietNam(tongQuan?.doanhThu || 0)} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} loading={loading}>
        <ColumnChart
          title="Số lịch trình theo tháng"
          xAxis={chartThangX}
          yAxis={chartThangY}
          yLabel={['Số lịch trình']}
          formatY={(val) => Math.round(val).toString()}
        />
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} xl={12}>
          <Card loading={loading}>
            <DonutChart
              xAxis={phanBoLabels}
              yAxis={[phanBoValues]}
              yLabel={['Chi tiêu']}
              showTotal
              colors={['#faad14', '#52c41a', '#1890ff', '#a0d911']}
              formatY={(val) => tienVietNam(val)}
            />
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card loading={loading}>
            <ColumnChart
              title="Điểm đến phổ biến"
              xAxis={chartPhoBienX}
              yAxis={chartPhoBienY}
              yLabel={['Lượt chọn']}
              formatY={(val) => Math.round(val).toString()}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ThongKePage;
