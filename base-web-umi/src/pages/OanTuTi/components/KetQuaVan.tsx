import React from 'react';
import { Card, Typography, Row, Col, Tag } from 'antd';
import {
    LuaChon,
    KetQua,
    layTenLuaChon,
    layIconLuaChon,
    layTenKetQua,
    layMauKetQua,
} from '@/services/OanTuTi';

const { Title, Text } = Typography;

interface KetQuaVanProps {
    luaChonNguoiChoi: LuaChon | null;
    luaChonMay: LuaChon | null;
    ketQua: KetQua | null;
}

const KetQuaVan: React.FC<KetQuaVanProps> = ({ luaChonNguoiChoi, luaChonMay, ketQua }) => {
    if (!luaChonNguoiChoi || !luaChonMay || !ketQua) {
        return (
            <Card style={{ textAlign: 'center', marginBottom: 24 }}>
                <Text type='secondary' style={{ fontSize: 16 }}>
                    🎮 Hãy chọn Kéo, Búa hoặc Bao để bắt đầu!
                </Text>
            </Card>
        );
    }

    return (
        <Card style={{ textAlign: 'center', marginBottom: 24 }}>
            <Row gutter={24} align='middle' justify='center'>
                {/* Người chơi */}
                <Col>
                    <div style={{ textAlign: 'center' }}>
                        <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>
                            Bạn chọn
                        </Text>
                        <div style={{ fontSize: 64 }}>{layIconLuaChon(luaChonNguoiChoi)}</div>
                        <Text style={{ fontSize: 16, display: 'block', marginTop: 8 }}>
                            {layTenLuaChon(luaChonNguoiChoi)}
                        </Text>
                    </div>
                </Col>

                {/* Kết quả */}
                <Col>
                    <div style={{ textAlign: 'center', padding: '0 24px' }}>
                        <Title level={3} style={{ margin: 0, fontSize: 24 }}>
                            VS
                        </Title>
                        <Tag
                            color={layMauKetQua(ketQua)}
                            style={{
                                fontSize: 18,
                                padding: '4px 16px',
                                marginTop: 8,
                                fontWeight: 'bold',
                            }}
                        >
                            {ketQua === KetQua.THANG}
                            {ketQua === KetQua.THUA}
                            {ketQua === KetQua.HOA}
                            {layTenKetQua(ketQua)}
                        </Tag>
                    </div>
                </Col>

                {/* Máy tính */}
                <Col>
                    <div style={{ textAlign: 'center' }}>
                        <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>
                            Máy chọn
                        </Text>
                        <div style={{ fontSize: 64 }}>{layIconLuaChon(luaChonMay)}</div>
                        <Text style={{ fontSize: 16, display: 'block', marginTop: 8 }}>
                            {layTenLuaChon(luaChonMay)}
                        </Text>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default KetQuaVan;
