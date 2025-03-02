import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, G, Text as SvgText} from 'react-native-svg';
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
  return (
    <View style={styles.container}>
      <Svg width="100%" height="280" viewBox="-150 -130 300 280">
        {/* 雷达背景圆圈 */}
        <Circle
          r="130"
          fill="none"
          stroke="rgba(30, 144, 255, 0.2)"
          strokeWidth="1"
        />
        <Circle
          r="90"
          fill="none"
          stroke="rgba(30, 144, 255, 0.2)"
          strokeWidth="1"
        />
        <Circle
          r="50"
          fill="none"
          stroke="rgba(30, 144, 255, 0.2)"
          strokeWidth="1"
        />

        {/* 中心点 */}
        <Circle r="18" fill={colors.primary} />
        <G transform="translate(-10,-10)">
          <PersonIcon size={20} color="#FFF" />
        </G>

        {/* 设备点 */}
        {devices.map(device => {
          const angle = (device.angle * Math.PI) / 180;
          const distance = device.distance * 120; // 调整设备距离
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;

          return (
            <G
              key={device.id}
              transform={`translate(${x},${y})`}
              onPress={() => onDevicePress(device)}>
              <Circle r="16" fill="#F5F5F7" />
              <G transform="translate(-12,-12)">
                <DeviceTypeIcon
                  type={device.type}
                  color={
                    device.status === 'online'
                      ? colors.primary
                      : colors.disabled
                  }
                  size={24}
                />
              </G>
              <SvgText
                y="36"
                textAnchor="middle"
                fill={colors.text}
                fontSize="11"
                fontWeight="400">
                {device.name}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    marginRight: 26,
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
