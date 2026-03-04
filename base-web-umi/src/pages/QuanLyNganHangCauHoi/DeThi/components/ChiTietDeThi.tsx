import { useModel } from 'umi';
import { Descriptions, Typography, Divider, Spin } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

const ChiTietDeThi = () => {
    const { currentDeThi, loading } = useModel('quanlynganhangcauhoi.deThi');

    if (loading || !currentDeThi) return <Spin />;

    return (
        <div style={{ padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={3}>ĐỀ THI MÔN {currentDeThi.monHocId?.tenMonHoc?.toUpperCase()}</Title>
                <Text strong>Mã đề thi: {currentDeThi.maDeThi}</Text>
                <br />
                <Text>Thời gian làm bài: {currentDeThi.thoiGianLamBai} phút</Text>
            </div>

            <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="Tổng số câu hỏi">{currentDeThi.soLuongCauHoi}</Descriptions.Item>
                <Descriptions.Item label="Tổng điểm">{currentDeThi.tongDiem}</Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">{moment(currentDeThi.createdAt).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <div>
                <Title level={4}>Danh sách câu hỏi:</Title>
                {currentDeThi.danhSachCauHoi?.map((ch: any, index: number) => {
                    const cauHoiObj = ch.cauHoiId;
                    return (
                        <div key={index} style={{ marginBottom: 16 }}>
                            <Text strong>
                                Câu {index + 1} ({ch.diem} điểm) - [Khối: {cauHoiObj?.khoiKienThucId?.tenKhoiKienThuc} | Độ khó: {cauHoiObj?.mucDoKho}]:
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
