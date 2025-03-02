import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {colors} from '../styles/theme';
import {ArrowLeftIcon, ChevronRightIcon} from '../components/icons';
import {PathPickerScreen} from './PathPickerScreen';
import DeviceInfo from 'react-native-device-info';

interface SettingsScreenProps {
  deviceName: string;
  onDeviceNameChange: (name: string) => void;
  savePath: string;
  onSavePathChange: (path: string) => void;
}

export const SettingsScreen = ({
  deviceName,
  onDeviceNameChange,
  savePath,
  onSavePathChange,
}: SettingsScreenProps) => {
  const [showPathPicker, setShowPathPicker] = useState(false);
  const [chunkSize, _setChunkSize] = useState(16);
  const [maxConcurrent, _setMaxConcurrent] = useState(5);
  const [defaultDeviceName, setDefaultDeviceName] = useState('Unknown Device');
  useEffect(() => {
    const fetchDeviceName = async () => {
      if (Platform.OS === 'android') {
        const model = await DeviceInfo.getModel();
        setDefaultDeviceName(model);
      } else if (Platform.OS === 'ios') {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const deviceName = await DeviceInfo.getDeviceName();
        setDefaultDeviceName(deviceName);
      }
    };
    fetchDeviceName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>设置</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>基本设置</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>设备名称</Text>
          <TextInput
            style={styles.input}
            value={deviceName || defaultDeviceName}
            onChangeText={onDeviceNameChange}
            editable={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="输入设备名称"
            placeholderTextColor={colors.disabled}
          />
        </View>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowPathPicker(true)}>
          <Text style={styles.settingLabel}>默认保存路径</Text>
          <View style={styles.settingValue}>
            <Text style={styles.pathText}>{savePath}</Text>
            <ChevronRightIcon size={20} color={colors.text} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>传输设置</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>分片大小</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{Math.round(chunkSize)} MB</Text>
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>最大并发数</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{Math.round(maxConcurrent)}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.aboutItem}>
        <Text style={styles.settingLabel}>关于</Text>
        <ChevronRightIcon size={20} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.exitButton}>
        <Text style={styles.exitButtonText}>退出应用</Text>
      </TouchableOpacity>

      {showPathPicker && (
        <PathPickerScreen
          currentPath={savePath}
          onPathSelect={path => {
            onSavePathChange(path);
            setShowPathPicker(false);
          }}
          onClose={() => setShowPathPicker(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 8,
    marginTop: 8,
  },
  topTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  settingItem: {
    backgroundColor: colors.background,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    textAlign: 'right',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pathText: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  sliderValue: {
    fontSize: 16,
    color: colors.text,
    width: 50,
    textAlign: 'right',
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.surface,
  },
  exitButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
  },
  exitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
