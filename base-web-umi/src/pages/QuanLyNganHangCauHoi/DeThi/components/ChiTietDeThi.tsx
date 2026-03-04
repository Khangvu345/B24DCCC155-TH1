import { useModel } from 'umi';
import { Descriptions, Typography, Divider, Spin } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

const ChiTietDeThi = () => {
    const { currentDeThi, loading } = useModel('quanlynganhangcauhoi.deThi');
    const { data: listKhoiKienThuc } = useModel('quanlynganhangcauhoi.khoiKienThuc');

    if (loading || !currentDeThi) return <Spin />;

    return (
        <div style={{ padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ĐỀ THI MÔN {currentDeThi.monHocId?.tenMonHoc?.toUpperCase()}</Title>
                <Text strong>Tiêu đề: {currentDeThi.tieuDe}</Text>
            </div>

            <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="Tổng số câu hỏi">{currentDeThi.danhSachCauHoi?.length || 0}</Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">{moment(currentDeThi.ngayTao).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <div>
                <Title level={4}>Danh sách câu hỏi:</Title>
                {currentDeThi.cauHoiChiTiet?.map((cauHoiObj: any, index: number) => {
                    const tenKhoiKienThuc = listKhoiKienThuc?.find((k: any) => k.id === cauHoiObj?.khoiKienThucId)?.ten || cauHoiObj?.khoiKienThucId;
                    return (
                        <div key={index} style={{ marginBottom: 16 }}>
                            <Text strong>
                                Câu {index + 1} - [Khối: {tenKhoiKienThuc} | Độ khó: {{ 'de': 'Dễ', 'trungBinh': 'Trung bình', 'kho': 'Khó', 'ratKho': 'Rất khó' }[cauHoiObj?.mucDo as string] || cauHoiObj?.mucDo}]:
                            </Text>
                            <div style={{ marginTop: 8, whiteSpace: 'pre-line' }}>
                                {cauHoiObj?.noiDung}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChiTietDeThi;
