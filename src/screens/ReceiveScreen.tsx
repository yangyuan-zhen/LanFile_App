import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors} from '../styles/theme';
import {QrCodeIcon, ShareIcon, ArrowLeftIcon} from '../components/icons';

export const ReceiveScreen = () => {
  const [savePath, setSavePath] = useState('/Download/Transfer');

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>接收文件</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value="点击磁力链接"
          editable={false}
          placeholder="点击磁力链接"
        />
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.iconButton}>
            <QrCodeIcon color={colors.text} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <ShareIcon color={colors.text} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.savePathContainer}>
        <View style={styles.savePathHeader}>
          <Text style={styles.savePathTitle}>存储路径</Text>
          <TouchableOpacity onPress={() => console.log('Change path')}>
            <Text style={styles.changeButton}>更改</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.pathText}>{savePath}</Text>
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>开始接收</Text>
      </TouchableOpacity>
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
  topTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  inputContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: colors.text,
    marginRight: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  savePathContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  savePathHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  savePathTitle: {
    fontSize: 16,
    color: colors.text,
  },
  changeButton: {
    fontSize: 14,
    color: colors.primary,
  },
  pathText: {
    fontSize: 16,
    color: colors.text,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 8,
    marginTop: 8,
  },
});
