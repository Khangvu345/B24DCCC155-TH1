import { Button, Card, Col, Empty, Image, Modal, Rate, Row, Space, Spin, Tag, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';
import { tienVietNam } from '@/utils/utils';
import FilterBar, { type TFilterState } from './FilterBar';

const { Text, Title } = Typography;

const calcGiaDuKien = (item: KeHoachDuLich.IDiemDen) =>
  item.giaDuKien ?? (item.chiPhiAnUong || 0) + (item.chiPhiLuuTru || 0) + (item.chiPhiDiChuyen || 0);

const loaiHinhLabelMap: Record<KeHoachDuLich.TLoaiHinh, string> = {
  Bien: 'Biển',
  Nui: 'Núi',
  ThanhPho: 'Thành phố',
};

const getLoaiHinhLabel = (value?: KeHoachDuLich.TLoaiHinh) => (value ? loaiHinhLabelMap[value] ?? value : '');

const KhamPhaPage = () => {
  const model = useModel('kehoachdulich.diemDen' as any) as any;
  const { getAllModel, danhSach, loading } = model;

  const [filters, setFilters] = useState<TFilterState>({
    loaiHinh: 'TatCa',
    priceRange: [0, 0],
    rating: 0,
    sort: 'rating-desc',
  });
  const [initRange, setInitRange] = useState<boolean>(false);
  const [selected, setSelected] = useState<KeHoachDuLich.IDiemDen | null>(null);

  useEffect(() => {
    getAllModel().catch((error: unknown) => console.log(error));
  }, []);

  const dataWithPrice = useMemo(
    () =>
      (danhSach || []).map((item: KeHoachDuLich.IDiemDen) => ({
        ...item,
        giaDuKien: calcGiaDuKien(item),
      })),
    [danhSach],
  );

  const maxPrice = useMemo(() => {
    if (!dataWithPrice.length) return 0;
    return dataWithPrice.reduce((max: number, item: KeHoachDuLich.IDiemDen) => Math.max(max, item.giaDuKien || 0), 0);
  }, [dataWithPrice]);

  useEffect(() => {
    if (!initRange && maxPrice > 0) {
      setFilters((prev) => ({ ...prev, priceRange: [0, maxPrice] }));
      setInitRange(true);
    }
  }, [initRange, maxPrice]);

  const filtered = useMemo(() => {
    let next = [...dataWithPrice];

    if (filters.loaiHinh && filters.loaiHinh !== 'TatCa') {
      next = next.filter((item) => item.loaiHinh === filters.loaiHinh);
    }

    if (filters.rating && filters.rating > 0) {
      next = next.filter((item) => item.rating >= (filters.rating || 0));
    }

    const [minPrice, maxPriceRange] = filters.priceRange || [0, maxPrice];
    next = next.filter((item) => {
      const gia = item.giaDuKien || 0;
      return gia >= minPrice && gia <= maxPriceRange;
    });

    switch (filters.sort) {
      case 'rating-asc':
        next.sort((a, b) => a.rating - b.rating);
        break;
      case 'price-asc':
        next.sort((a, b) => (a.giaDuKien || 0) - (b.giaDuKien || 0));
        break;
      case 'price-desc':
        next.sort((a, b) => (b.giaDuKien || 0) - (a.giaDuKien || 0));
        break;
      default:
        next.sort((a, b) => b.rating - a.rating);
    }

    return next;
  }, [dataWithPrice, filters, maxPrice]);

  const openPlan = (id?: string) => {
    if (!id) return;
    history.push(`/du-lich/lich-trinh?diemDenId=${id}`);
  };

  return (
    <div>
      <FilterBar value={filters} onChange={setFilters} maxPrice={maxPrice} />

      <div style={{ marginTop: 16 }}>
        {loading ? (
          <Spin />
        ) : filtered.length === 0 ? (
          <Empty description="Không có điểm đến phù hợp" />
        ) : (
          <Row gutter={[16, 16]}>
            {filtered.map((item) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={item._id}>
                <Card
                  hoverable
                  cover={
                    item.anhDaiDien ? (
                      <Image height={180} style={{ objectFit: 'cover' }} src={item.anhDaiDien} preview={false} />
                    ) : null
                  }
                  actions={[
                    <Button type="link" key="detail" onClick={() => setSelected(item)}>
                      Xem chi tiết
                    </Button>,
                    <Button type="link" key="plan" onClick={() => openPlan(item._id)}>
                      Lập lịch
                    </Button>,
                  ]}
                >
                  <Space direction="vertical" size={4} style={{ width: '100%' }}>
                    <Title level={5} style={{ margin: 0 }}>
                      {item.ten}
                    </Title>
                    <Text type="secondary">{item.diaDiem}</Text>
                    <Tag color="blue">{getLoaiHinhLabel(item.loaiHinh)}</Tag>
                    <Rate allowHalf disabled value={item.rating} />
                    <Text strong>{tienVietNam(item.giaDuKien || 0)}</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        visible={!!selected}
        title={selected?.ten}
        footer={null}
        onCancel={() => setSelected(null)}
        width={720}
      >
        {selected ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} md={10}>
              {selected.anhDaiDien ? (
                <Image src={selected.anhDaiDien} style={{ borderRadius: 8 }} />
              ) : (
                <div style={{ height: 200, background: '#f5f5f5', borderRadius: 8 }} />
              )}
            </Col>
            <Col xs={24} md={14}>
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <Text>Địa điểm: {selected.diaDiem}</Text>
                <Text>Loại hình: {getLoaiHinhLabel(selected.loaiHinh)}</Text>
                <Text>Thời gian tham quan: {selected.thoiGianThamQuan} phút</Text>
                <Text>Chi phí ăn uống: {tienVietNam(selected.chiPhiAnUong || 0)}</Text>
                <Text>Chi phí lưu trú: {tienVietNam(selected.chiPhiLuuTru || 0)}</Text>
                <Text>Chi phí di chuyển: {tienVietNam(selected.chiPhiDiChuyen || 0)}</Text>
                <Text strong>Giá dự kiến: {tienVietNam(calcGiaDuKien(selected))}</Text>
              </Space>
            </Col>
            <Col span={24}>
              <Card type="inner" title="Mô tả">
                {selected.moTa || 'Chưa có mô tả'}
              </Card>
            </Col>
          </Row>
        ) : null}
      </Modal>
    </div>
  );
};

export default KhamPhaPage;
