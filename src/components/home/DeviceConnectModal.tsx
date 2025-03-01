import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {colors} from '../../styles/theme';
import {Device} from '../../types/device';
import {DeviceTypeIcon} from './DeviceTypeIcon';

interface DeviceConnectModalProps {
  device: Device | null;
  visible: boolean;
  onClose: () => void;
  onSendFile: (device: Device) => void;
}

export const DeviceConnectModal = ({
  device,
  visible,
  onClose,
  onSendFile,
}: DeviceConnectModalProps) => {
  if (!device) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.title}>连接到 {device.name}</Text>
            <View style={styles.deviceIcon}>
              <DeviceTypeIcon
                type={device.type}
                color={colors.text}
                size={32}
              />
            </View>
            <Text style={styles.ip}>IP: {device.ip}</Text>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => onSendFile(device)}>
              <Text style={styles.sendButtonText}>发送文件</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: -12,
    top: -12,
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: colors.text,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  deviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  ip: {
    fontSize: 14,
    color: colors.disabled,
    marginBottom: 24,
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
