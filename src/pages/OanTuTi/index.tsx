import React from 'react';
import { Card, Button, Typography, Statistic, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { KetQua } from '@/services/OanTuTi';
import LuaChonButton from './components/LuaChonButton';
import KetQuaVan from './components/KetQuaVan';
import LichSuDau from './components/LichSuDau';

const { Title } = Typography;

const OanTuTiPage: React.FC = () => {
    const {
        lichSuDau,
        luaChonNguoiChoi,
        luaChonMay,
        ketQua,
        dangChoi,
        demVan,
        choi,
        resetGame,
    } = useModel('oantuti');

    // Thống kê
    const soThang = lichSuDau.filter((v) => v.ketQua === KetQua.THANG).length;
    const soThua = lichSuDau.filter((v) => v.ketQua === KetQua.THUA).length;
    const soHoa = lichSuDau.filter((v) => v.ketQua === KetQua.HOA).length;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={3} style={{ margin: 0 }}>
                            ✊✌️✋ Oẳn Tù Tì
                        </Title>
                        <Button icon={<ReloadOutlined />} onClick={resetGame}>
                            Chơi lại
                        </Button>
                    </div>
                }
            >
                {/* Thống kê */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={6}>
                        <Statistic title='Tổng ván' value={demVan} />
                    </Col>
                    <Col span={6}>
                        <Statistic title='Thắng' value={soThang} valueStyle={{ color: '#52c41a' }} />
                    </Col>
                    <Col span={6}>
                        <Statistic title='Thua' value={soThua} valueStyle={{ color: '#ff4d4f' }} />
                    </Col>
                    <Col span={6}>
                        <Statistic title='Hòa' value={soHoa} valueStyle={{ color: '#faad14' }} />
                    </Col>
                </Row>

                {/* Khu vực chọn */}
                <div style={{ marginBottom: 24 }}>
                    <Title level={4} style={{ textAlign: 'center', marginBottom: 16 }}>
                        Chọn một:
                    </Title>
                    <LuaChonButton onChon={choi} disabled={dangChoi} />
                </div>

                {/* Kết quả ván hiện tại */}
                <KetQuaVan
                    luaChonNguoiChoi={luaChonNguoiChoi}
                    luaChonMay={luaChonMay}
                    ketQua={ketQua}
                />

                {/* Lịch sử */}
                <LichSuDau lichSu={lichSuDau} />
            </Card>
        </div>
    );
};

export default OanTuTiPage;
