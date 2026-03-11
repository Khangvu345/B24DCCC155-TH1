import React, { useEffect } from 'react';
import { Row, Col, Card, Spin } from 'antd';
import { useModel } from 'umi';
import ColumnChart from '@/components/Chart/ColumnChart';
import DonutChart from '@/components/Chart/DonutChart';

const ThongKeVaBaoCao = () => {
    const { 
        dataLichHen, 
        dataDichVu, 
        dataNhanVien, 
        loading, 
        fetchAllData 
    } = useModel('chamsockhachhang.thongke.thongKe');

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <Spin spinning={loading}>
            <div style={{ padding: 24 }}>
                <h2 style={{ marginBottom: 24, fontWeight: 600 }}>Thống kê & Báo cáo</h2>
                
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Card title="Số lượng lịch hẹn 7 ngày gần nhất" bordered={false} hoverable>
                            <ColumnChart 
                                title="Lượt khách"
                                xAxis={dataLichHen?.xAxis || []}
                                yAxis={dataLichHen?.yAxis || [[]]}
                                yLabel={['Số lượng lịch hẹn']}
                                height={350}
                                formatY={(val) => `${val} lượt`}
                            />
                        </Card>
                    </Col>
                    
                    <Col span={12}>
                        <Card title="Tỷ trọng doanh thu theo Dịch vụ" bordered={false} hoverable>
                            <DonutChart 
                                xAxis={dataDichVu?.xAxis || []}
                                yAxis={dataDichVu?.yAxis || [[]]}
                                height={350}
                                showTotal={true}
                            />
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title="Doanh thu mang lại theo Cán bộ/Nhân viên" bordered={false} hoverable>
                            <ColumnChart 
                                title="VNĐ"
                                xAxis={dataNhanVien?.xAxis || []}
                                yAxis={dataNhanVien?.yAxis || [[]]}
                                yLabel={['Doanh thu']}
                                height={350}
                                type="bar"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Spin>
    );
};

export default ThongKeVaBaoCao;