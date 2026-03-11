import React from 'react';
import { Card, Tabs } from 'antd';
import DichVu from './components/DichVu/DichVu';
import NhanVien from './components/NhanVien/NhanVien';

const QuanLyNhanVienVaDichVu = () => {
    return (
        <Card bordered={false}>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Quản lý Dịch vụ" key="1">
                    <DichVu />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Quản lý Nhân viên" key="2">
                    <NhanVien />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
};

export default QuanLyNhanVienVaDichVu;