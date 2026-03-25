import ColumnChart from '@/components/Chart/ColumnChart';
import { genExcelFile } from '@/utils/utils';
import { Button, Card, Col, Row, Select, Statistic, message } from 'antd';
import axios from '@/utils/axios';
import { useEffect, useMemo, useState } from 'react';

const ThongKePage = () => {
  const [tongQuan, setTongQuan] = useState<QuanLyCauLacBo.IThongKeTongQuan>();
  const [chartData, setChartData] = useState<QuanLyCauLacBo.IThongKeDonTheoCLB[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [selectedCLB, setSelectedCLB] = useState<string>();

  const getThongKe = async () => {
    setLoading(true);
    try {
      const [tongQuanRes, chartRes] = await Promise.all([
        axios.get('/api/thong-ke/tong-quan'),
        axios.get('/api/thong-ke/don-theo-clb'),
      ]);
      setTongQuan(tongQuanRes?.data?.data);
      const chart = chartRes?.data?.data || [];
      setChartData(chart);
      if (!selectedCLB && chart[0]?.cauLacBoId) setSelectedCLB(chart[0].cauLacBoId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getThongKe();
  }, []);

  const clbOptions = useMemo(
    () => chartData.map((item) => ({ label: item.tenCLB, value: item.cauLacBoId })),
    [chartData],
  );

  const exportThanhVien = async () => {
    if (!selectedCLB) {
      message.warning('Vui long chon cau lac bo de xuat danh sach thanh vien');
      return;
    }

    const clb = chartData.find((item) => item.cauLacBoId === selectedCLB);
    setExportLoading(true);
    try {
      const res = await axios.get('/api/thanh-vien/page', {
        params: {
          page: 1,
          limit: 1000,
          condition: { cauLacBoId: selectedCLB },
        },
      });

      const rows: QuanLyCauLacBo.IThanhVien[] = res?.data?.data?.result || [];
      const excelData: (string | number)[][] = [
        ['Ho ten', 'Email', 'SDT', 'Gioi tinh', 'Dia chi', 'So truong', 'Ngay dang ky'],
        ...rows.map((item) => [
          item.hoTen,
          item.email,
          item.sdt,
          item.gioiTinh,
          item.diaChi,
          item.soTruong,
          item.ngayDangKy,
        ]),
      ];

      genExcelFile(excelData, `ThanhVien_${(clb?.tenCLB || 'CLB').replace(/\s+/g, '_')}.xlsx`);
      message.success('Xuat file thanh cong');
    } catch (error) {
      console.log(error);
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Tong so CLB" value={tongQuan?.tongCLB || 0} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Don Pending" value={tongQuan?.pending || 0} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Don Approved" value={tongQuan?.approved || 0} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Card loading={loading}>
            <Statistic title="Don Rejected" value={tongQuan?.rejected || 0} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} loading={loading}>
        <ColumnChart
          title="So don dang ky theo tung CLB"
          xAxis={chartData.map((item) => item.tenCLB)}
          yAxis={[
            chartData.map((item) => item.pending),
            chartData.map((item) => item.approved),
            chartData.map((item) => item.rejected),
          ]}
          yLabel={['Pending', 'Approved', 'Rejected']}
          colors={['#faad14', '#52c41a', '#ff4d4f']}
          formatY={(val) => Math.round(val).toString()}
        />
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} md={12} lg={8}>
            <Select
              style={{ width: '100%' }}
              options={clbOptions}
              value={selectedCLB}
              placeholder="Chon CLB can xuat danh sach thanh vien"
              showSearch
              optionFilterProp="label"
              onChange={(value) => setSelectedCLB(value)}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={exportThanhVien} loading={exportLoading}>
              Xuat danh sach thanh vien
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ThongKePage;
