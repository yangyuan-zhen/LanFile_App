import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, G, Text as SvgText} from 'react-native-svg';
import {colors} from '../../styles/theme';
import {Device} from '../../types/device';
import {PersonIcon, PhoneIcon, LaptopIcon, TvIcon, ServerIcon} from '../icons';

interface RadarViewProps {
  devices: Device[];
  onDevicePress?: (device: Device) => void;
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
          const distance = device.distance * (size / 2 - 40);
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;

          return (
            <G
              key={device.id}
              x={x}
              y={y}
              onPress={() => onDevicePress?.(device)}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{cursor: 'pointer'}}>
              <Circle r={15} fill={colors.surface} />
              <G x={-10} y={-10}>
                <DeviceTypeIcon
                  type={device.type}
                  color={colors.text}
                  size={20}
                />
              </G>
              <SvgText
                x={0}
                y={25}
                textAnchor="middle"
                fill={colors.text}
                fontSize={12}>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
