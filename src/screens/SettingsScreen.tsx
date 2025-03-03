import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';
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
  const [showAbout, setShowAbout] = useState(false);
  const [chunkSize, setChunkSize] = useState(16);
  const [maxConcurrent, setMaxConcurrent] = useState(5);
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
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={32}
              step={1}
              value={chunkSize}
              onValueChange={setChunkSize}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.surface}
              thumbTintColor={colors.primary}
            />
            <Text style={styles.sliderValue}>{Math.round(chunkSize)} MB</Text>
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>最大并发数</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={maxConcurrent}
              onValueChange={setMaxConcurrent}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.surface}
              thumbTintColor={colors.primary}
            />
            <Text style={styles.sliderValue}>{Math.round(maxConcurrent)}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.aboutItem}
        onPress={() => setShowAbout(true)}>
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

      <Modal
        visible={showAbout}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAbout(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.aboutModalContent}>
            <View style={styles.aboutModalHeader}>
              <Text style={styles.aboutModalTitle}>关于 LanFile</Text>
              <TouchableOpacity onPress={() => setShowAbout(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.aboutVersion}>版本: 0.0.1</Text>
            <Text style={styles.aboutText}>
              LanFile 是一个基于 Web 的文件传输工具，允许用户在局域网内快速
              发现设备并传输文件，无需互联网连接。
            </Text>
            <Text style={styles.aboutCopyright}>
              © 2025 LanFile Team (元之贞). 保留所有权利。
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    fontSize: 20,
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
  },
  slider: {
    flex: 1,
    height: 40,
    marginRight: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutModalContent: {
    width: '85%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  aboutModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeButton: {
    fontSize: 20,
    color: colors.text,
    padding: 5,
  },
  aboutVersion: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  aboutCopyright: {
    fontSize: 14,
    color: colors.disabled,
    marginTop: 8,
  },
});
