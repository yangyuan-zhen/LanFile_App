import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {RadarView} from '../components/home/RadarView';
import {colors} from '../styles/theme';
import {Device} from '../types/device';
import {RefreshIcon} from '../components/icons';
import {PhoneIcon, LaptopIcon, TvIcon, ServerIcon} from '../components/icons';
import {DeviceConnectModal} from '../components/home/DeviceConnectModal';
import {NetworkInfo} from 'react-native-network-info';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

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
  const [wifiName, setWifiName] = useState('获取中...');
  const [ipAddress, setIpAddress] = useState('');

  const requestPermissionsAndGetNetworkInfo = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        // 检查权限
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (result === RESULTS.GRANTED) {
          // 检查位置服务是否开启
          const locationEnabled = await checkLocationServices();
          if (!locationEnabled) {
            promptEnableLocationServices();
            return;
          }
          getNetworkInfo();
        } else if (result === RESULTS.DENIED) {
          // 请求权限
          const requestResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (requestResult === RESULTS.GRANTED) {
            const locationEnabled = await checkLocationServices();
            if (!locationEnabled) {
              promptEnableLocationServices();
              return;
            }
            getNetworkInfo();
          } else {
            showPermissionDeniedAlert();
          }
        } else {
          showPermissionDeniedAlert();
        }
      } catch (err) {
        console.warn(err);
        setWifiName('权限请求失败');
      }
    } else if (Platform.OS === 'ios') {
      // iOS 也需要位置权限
      try {
        const permissionStatus = await check(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        if (permissionStatus === RESULTS.GRANTED) {
          getNetworkInfo();
        } else if (permissionStatus === RESULTS.DENIED) {
          const requestResult = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (requestResult === RESULTS.GRANTED) {
            getNetworkInfo();
          } else {
            showPermissionDeniedAlert();
          }
        } else {
          showPermissionDeniedAlert();
        }
      } catch (err) {
        console.warn(err);
        setWifiName('权限请求失败');
      }
    }
  }, []);

  useEffect(() => {
    requestPermissionsAndGetNetworkInfo();
  }, [requestPermissionsAndGetNetworkInfo]);

  const getNetworkInfo = async () => {
    try {
      // 获取WiFi名称
      const ssid = await NetworkInfo.getSSID();
      setWifiName(ssid || '未知网络');

      // 获取IP地址
      const ip = await NetworkInfo.getIPV4Address();
      setIpAddress(ip || '未知IP');

      console.log('WiFi名称:', ssid);
      console.log('IP地址:', ip);
    } catch (error) {
      console.error('获取网络信息失败:', error);
      setWifiName('获取失败');
      setIpAddress('');
    }
  };

  const handleDevicePress = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleSendFile = (deviceName: string) => {
    onSendFile(deviceName);
    setSelectedDevice(null);
  };

  // 检查位置服务是否开启（Android特定）
  const checkLocationServices = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      // 尝试获取WiFi SSID，如果失败可能是因为位置服务未开启
      const ssid = await NetworkInfo.getSSID();
      return ssid !== null && ssid !== '<unknown ssid>';
    } catch (error) {
      console.log('位置服务检查失败', error);
      return false;
    }
  };

  // 提示用户开启位置服务
  const promptEnableLocationServices = () => {
    Alert.alert(
      '需要开启位置服务',
      '在Android 9及以上版本，获取WiFi信息需要开启位置服务。请前往设置开启位置服务。',
      [
        {
          text: '取消',
          style: 'cancel',
          onPress: () => setWifiName('需要开启位置服务'),
        },
        {
          text: '去设置',
          onPress: () => {
            Linking.openSettings();
            setWifiName('请开启位置服务后返回');
          },
        },
      ],
    );
  };

  // 显示权限被拒绝的提示
  const showPermissionDeniedAlert = () => {
    setWifiName('需要位置权限');
    Alert.alert(
      '权限被拒绝',
      '无法获取WiFi信息，因为位置权限被拒绝。我们需要此权限来识别您当前连接的WiFi网络。',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '去设置',
          onPress: () => {
            Linking.openSettings();
            setWifiName('请在设置中开启位置权限');
          },
        },
      ],
    );
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
          <Text style={styles.radarWifiInfo}>
            已连接到Wi-Fi: {wifiName}
            {ipAddress ? `\nIP地址: ${ipAddress}` : ''}
          </Text>
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
          <Text style={styles.listWifiInfo}>
            已连接到Wi-Fi: {wifiName}
            {ipAddress ? `\nIP地址: ${ipAddress}` : ''}
          </Text>
        </View>
      )}

      <DeviceConnectModal
        device={selectedDevice}
        visible={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        onSendFile={(device: Device) => handleSendFile(device.name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    display: 'flex',
    justifyContent: 'space-between',
  },
  radarWifiInfo: {
    textAlign: 'center',
    color: colors.text,
    padding: 16,
    marginBottom: 200,
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
