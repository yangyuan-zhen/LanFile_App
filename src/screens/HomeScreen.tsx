import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {RadarView} from '../components/home/RadarView';
import {colors} from '../styles/theme';
import {Device} from '../types/device';
import {RefreshIcon} from '../components/icons';
import {PhoneIcon, LaptopIcon, TvIcon, ServerIcon} from '../components/icons';
import {DeviceConnectModal} from '../components/home/DeviceConnectModal';

const mockDevices = [
  {
    id: '1',
    name: 'Phone-A',
    type: 'phone' as const,
    ip: '192.168.1.101',
    distance: 0.3,
    angle: 45,
    status: 'online' as const,
  },
  {
    id: '2',
    name: 'Laptop-B',
    type: 'laptop' as const,
    ip: '192.168.1.102',
    distance: 0.8,
    angle: 225,
    status: 'online' as const,
  },
  {
    id: '3',
    name: 'TV-C',
    type: 'tv' as const,
    ip: '192.168.1.103',
    distance: 0.5,
    angle: 135,
    status: 'online' as const,
  },
  {
    id: '4',
    name: 'Server-D',
    type: 'server' as const,
    ip: '192.168.1.104',
    distance: 0.9,
    angle: 0,
    status: 'offline' as const,
  },
];

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

const DeviceListItem = ({
  device,
  onPress,
}: {
  device: Device;
  onPress: (device: Device) => void;
}) => (
  <Pressable style={styles.deviceItem} onPress={() => onPress(device)}>
    <View style={styles.deviceInfo}>
      <View style={styles.deviceIcon}>
        <View style={styles.iconContainer}>
          <DeviceTypeIcon type={device.type} color={colors.text} size={24} />
        </View>
      </View>
      <View>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceIp}>{device.ip}</Text>
      </View>
    </View>
    <View style={styles.deviceStatus}>
      <Text
        style={[
          styles.statusText,
          {
            color:
              device.status === 'online' ? colors.primary : colors.disabled,
          },
        ]}>
        {device.status === 'online' ? '在线' : '离线'}
      </Text>
      <Text style={styles.arrow}>›</Text>
    </View>
  </Pressable>
);

interface HomeScreenProps {
  onSendFile: (deviceName: string) => void;
}

export const HomeScreen = ({onSendFile}: HomeScreenProps) => {
  const [viewMode, setViewMode] = useState<'radar' | 'list'>('radar');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleDevicePress = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleSendFile = (deviceName: string) => {
    onSendFile(deviceName);
    setSelectedDevice(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>附近设备</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => console.log('Refresh')}>
            <RefreshIcon size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'radar' && styles.activeToggle,
            ]}
            onPress={() => setViewMode('radar')}>
            <Text
              style={[
                styles.toggleText,
                viewMode === 'radar' && styles.activeToggleText,
              ]}>
              雷达视图
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'list' && styles.activeToggle,
            ]}
            onPress={() => setViewMode('list')}>
            <Text
              style={[
                styles.toggleText,
                viewMode === 'list' && styles.activeToggleText,
              ]}>
              列表视图
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'radar' ? (
        <View style={styles.radarView}>
          <RadarView devices={mockDevices} onDevicePress={handleDevicePress} />
          <Text style={styles.radarWifiInfo}>已连接到Wi-Fi: HomeWiFi</Text>
        </View>
      ) : (
        <View style={styles.listView}>
          <View style={styles.listContainer}>
            {mockDevices.map(device => (
              <DeviceListItem
                key={device.id}
                device={device}
                onPress={handleDevicePress}
              />
            ))}
          </View>
          <Text style={styles.listWifiInfo}>已连接到Wi-Fi: HomeWiFi</Text>
        </View>
      )}

      <DeviceConnectModal
        device={selectedDevice}
        visible={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        onSendFile={(device: Device) => handleSendFile(device.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 10,
  },
  header: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: colors.background,
  },
  toggleText: {
    color: colors.disabled,
  },
  activeToggleText: {
    color: colors.text,
  },
  listView: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 8,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  deviceIp: {
    fontSize: 14,
    color: colors.disabled,
    marginTop: 2,
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 8,
  },
  arrow: {
    fontSize: 20,
    color: colors.disabled,
  },
  radarView: {
    flex: 1,
  },
  radarWifiInfo: {
    textAlign: 'center',
    color: colors.text,
    padding: 16,
  },
  listWifiInfo: {
    textAlign: 'center',
    color: colors.text,
    padding: 16,
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
  },
  refreshButton: {
    padding: 8,
  },
});
