import React, { useEffect } from 'react';
import { Card, Empty } from 'antd';
import { useModel } from 'umi';
import Chart from 'react-apexcharts';

const ThongKePage: React.FC = () => {
  const quyetDinhModel = useModel('quanlyvanbang.quyetDinh');

  useEffect(() => {
    quyetDinhModel.getAllModel();
  }, []);

  const data = quyetDinhModel.danhSach.map((item: any) => ({
    soSQ: item.soSQ,
    counts: item.soLuotTraCuu || 0,
  }));

  if (data.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <Card title="Thống kê số lượt tra cứu theo Quyết định tốt nghiệp">
          <Empty description="Chưa có dữ liệu quyết định tốt nghiệp" />
        </Card>
      </div>
    );
  }

  const chartOptions = {
    chart: { id: 'search-counts-bar' },
    xaxis: {
      categories: data.map((item: any) => item.soSQ),
      title: { text: 'Quyết định' },
    },
    yaxis: { title: { text: 'Lượt tra cứu' } },
    title: {
      text: 'Thống kê số lượt tra cứu theo Quyết định tốt nghiệp',
      align: 'center' as const,
    },
  };

  const chartSeries = [{
    name: 'Lượt tra cứu',
    data: data.map((item: any) => item.counts),
  }];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Chart options={chartOptions} series={chartSeries} type="bar" width="100%" height="400" />
      </Card>
    </div>
  );
};

export default ThongKePage;
