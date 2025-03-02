import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {colors} from '../../styles/theme';
import {Device} from '../../types/device';
import {PersonIcon, PhoneIcon, LaptopIcon, TvIcon, ServerIcon} from '../icons';

interface RadarViewProps {
  devices: Device[];
  onDevicePress: (device: Device) => void;
}

const DeviceTypeIcon = ({
  type,
  color,
  size,
}: {
  type: Device['type'];
  color: string;
  size: number;
}) => {
  switch (type) {
    case 'phone':
      return <PhoneIcon color={color} size={size} />;
    case 'laptop':
      return <LaptopIcon color={color} size={size} />;
    case 'tv':
      return <TvIcon color={color} size={size} />;
    case 'server':
      return <ServerIcon color={color} size={size} />;
    default:
      return null;
  }
};

export const RadarView = ({devices, onDevicePress}: RadarViewProps) => {
  const size = 300;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 雷达背景圆圈 */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={size / 2 - 10}
          stroke={colors.primary}
          strokeWidth="0.5"
          opacity={0.2}
          fill="none"
        />
        <Circle
          cx={centerX}
          cy={centerY}
          r={(size / 2 - 10) * 0.66}
          stroke={colors.primary}
          strokeWidth="0.5"
          opacity={0.2}
          fill="none"
        />
        <Circle
          cx={centerX}
          cy={centerY}
          r={(size / 2 - 10) * 0.33}
          stroke={colors.primary}
          strokeWidth="0.5"
          opacity={0.2}
          fill="none"
        />

        {/* 中心点 */}
        <G x={centerX} y={centerY}>
          <Circle r={24} fill={colors.primary} />
          <G x={-12} y={-12}>
            <PersonIcon size={24} color="#FFF" />
          </G>
        </G>

        {/* 设备图标 */}
        {devices.map(device => {
          const angle = (device.angle * Math.PI) / 180;

          return (
            <TouchableOpacity
              key={device.id}
              style={[
                styles.deviceDot,
                {
                  left: `${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`,
                  top: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
                },
              ]}
              onPress={() => onDevicePress(device)}>
              <DeviceTypeIcon
                type={device.type}
                color={
                  device.status === 'online' ? colors.primary : colors.disabled
                }
                size={24}
              />
            </TouchableOpacity>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  deviceDot: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
