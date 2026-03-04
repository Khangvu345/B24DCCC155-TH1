import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { LuaChon, layTenLuaChon, layIconLuaChon } from '@/services/OanTuTi';

interface LuaChonButtonProps {
    onChon: (luaChon: LuaChon) => void;
    disabled?: boolean;
}

const LuaChonButton: React.FC<LuaChonButtonProps> = ({ onChon, disabled = false }) => {
    const luaChons = [LuaChon.KEO, LuaChon.BUA, LuaChon.BAO];

    return (
        <Space size='large' style={{ display: 'flex', justifyContent: 'center' }}>
            {luaChons.map((luaChon) => (
                <Tooltip key={luaChon} title={layTenLuaChon(luaChon)}>
                    <Button
                        size='large'
                        disabled={disabled}
                        onClick={() => onChon(luaChon)}
                        style={{
                            width: 100,
                            height: 100,
                            fontSize: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 16,
                            border: '2px solid #d9d9d9',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {layIconLuaChon(luaChon)}
                    </Button>
                </Tooltip>
            ))}
        </Space>
    );
};

export default LuaChonButton;
