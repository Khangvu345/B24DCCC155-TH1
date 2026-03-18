import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Descriptions, Empty, message, Modal, Table } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { ThongTinVanBang } from '@/pages/QuanLyVanBang/typing';
import { traCuuVanBang } from '@/services/QuanLyVanBang/thongTin';
import moment from 'moment';

const TraCuuPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThongTinVanBang[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const cauHinhModel = useModel('quanlyvanbang.cauHinh');
  const quyetDinhModel = useModel('quanlyvanbang.quyetDinh');

  useEffect(() => {
    cauHinhModel.getAllModel();
    quyetDinhModel.getAllModel();
  }, []);

  const onSearch = async (values: any) => {
    const filteredValues: any = {};
    Object.entries(values).forEach(([key, val]) => {
      if (val !== undefined && val !== '') filteredValues[key] = val;
    });

    if (Object.keys(filteredValues).length < 2) {
      message.warning('Vui lòng nhập ít nhất 2 tham số để tra cứu!');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const res = await traCuuVanBang(filteredValues);
      setResult(res?.data?.data || []);
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi tra cứu');
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const getQuyetDinh = (quyetDinhId: string) => {
    return quyetDinhModel.danhSach.find((q: any) => (q._id || q.id) === quyetDinhId);
  };

  const columns = [
    { title: 'Số hiệu VB', dataIndex: 'soHieuVanBang', width: 150 },
    { title: 'Số vào sổ', dataIndex: 'soVaoSo', align: 'center' as const, width: 100 },
    { title: 'MSV', dataIndex: 'maSinhVien', width: 120 },
    { title: 'Họ tên', dataIndex: 'hoTen', width: 200 },
    {
      title: 'Ngày sinh', dataIndex: 'ngaySinh', width: 120,
      render: (val: any) => val ? moment(val).format('DD/MM/YYYY') : '-',
    },
    {
      title: 'Quyết định', dataIndex: 'quyetDinhId', width: 150,
      render: (val: any) => getQuyetDinh(val)?.soSQ || '-',
    },
    {
      title: 'Thao tác', width: 100, align: 'center' as const,
      render: (_: any, record: any) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => { setSelectedRecord(record); setVisibleDetail(true); }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card title="Tra cứu thông tin văn bằng" style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ color: '#faad14' }}>* Nhập ít nhất 2 tham số để tìm kiếm</p>
        <Form layout="vertical" onFinish={onSearch}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item name="soHieuVanBang" label="Số hiệu văn bằng">
              <Input placeholder="Nhập số hiệu văn bằng" />
            </Form.Item>
            <Form.Item name="soVaoSo" label="Số vào sổ">
              <Input placeholder="Nhập số vào sổ" />
            </Form.Item>
            <Form.Item name="maSinhVien" label="Mã sinh viên">
              <Input placeholder="Nhập mã sinh viên" />
            </Form.Item>
            <Form.Item name="hoTen" label="Họ và tên">
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
            <Form.Item name="ngaySinh" label="Ngày sinh">
              <Input placeholder="Nhập ngày sinh (VD: 2001)" />
            </Form.Item>
          </div>
          <Form.Item style={{ textAlign: 'center', marginTop: 16 }}>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit" loading={loading} size="large">
              Tra cứu
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {searched && (
        <Card title={`Kết quả tra cứu (${result.length} bản ghi)`} style={{ marginTop: 24 }}>
          {result.length > 0 ? (
            <Table
              dataSource={result}
              columns={columns}
              rowKey={(r: any) => r._id || r.id}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 900 }}
            />
          ) : (
            <Empty description="Không có kết quả nào được tìm thấy" />
          )}
        </Card>
      )}

      <Modal
        title="Chi tiết văn bằng"
        visible={visibleDetail}
        onCancel={() => setVisibleDetail(false)}
        footer={<Button onClick={() => setVisibleDetail(false)}>Đóng</Button>}
        width={700}
      >
        {selectedRecord && (() => {
          const qd = getQuyetDinh(selectedRecord.quyetDinhId);
          return (
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Họ tên">{selectedRecord.hoTen}</Descriptions.Item>
              <Descriptions.Item label="Mã sinh viên">{selectedRecord.maSinhVien}</Descriptions.Item>
              <Descriptions.Item label="Số hiệu văn bằng">{selectedRecord.soHieuVanBang}</Descriptions.Item>
              <Descriptions.Item label="Số vào sổ">{selectedRecord.soVaoSo}</Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {selectedRecord.ngaySinh ? moment(selectedRecord.ngaySinh).format('DD/MM/YYYY') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Số quyết định">{qd?.soSQ || '-'}</Descriptions.Item>
              <Descriptions.Item label="Ngày ban hành QĐ">
                {qd?.ngayBanHanh ? moment(qd.ngayBanHanh).format('DD/MM/YYYY') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Trích yếu">{qd?.trichYeu || '-'}</Descriptions.Item>
              {cauHinhModel.danhSach.map((ch: any) => (
                <Descriptions.Item key={ch._id || ch.id} label={ch.tenTruong}>
                  {ch.kieuDuLieu === 'Date'
                    ? (selectedRecord.extraFields?.[ch.maTruong] ? moment(selectedRecord.extraFields[ch.maTruong]).format('DD/MM/YYYY') : '-')
                    : (selectedRecord.extraFields?.[ch.maTruong] ?? '-')}
                </Descriptions.Item>
              ))}
            </Descriptions>
          );
        })()}
      </Modal>
    </div>
  );
};

export default TraCuuPage;
