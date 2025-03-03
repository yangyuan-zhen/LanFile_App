import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../styles/theme';
import {
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  CloseIcon,
} from '../components/icons';

interface TransferItem {
  id: string;
  name: string;
  from?: string;
  to?: string;
  currentSize: string;
  totalSize: string;
  progress: number;
  speed?: string;
  status: 'sending' | 'receiving' | 'completed' | 'paused';
}

const mockSendingTransfers: TransferItem[] = [
  {
    id: '1',
    name: 'vacation.jpg',
    to: 'Phone-A',
    currentSize: '2.5 MB',
    totalSize: '2.5 MB',
    progress: 100,
    speed: '1.2 MB/s',
    status: 'sending',
  },
  {
    id: '2',
    name: 'presentation.pdf',
    to: 'Laptop-B',
    currentSize: '1.8 MB',
    totalSize: '1.8 MB',
    progress: 100,
    status: 'completed',
  },
];

const mockReceivingTransfers: TransferItem[] = [
  {
    id: '1',
    name: 'movie.mp4',
    from: 'Server-D',
    currentSize: '250 MB',
    totalSize: '350 MB',
    progress: 71,
    speed: '2.5 MB/s',
    status: 'receiving',
  },
  {
    id: '2',
    name: 'document.docx',
    from: 'Laptop-B',
    currentSize: '1.2 MB',
    totalSize: '1.2 MB',
    progress: 30,
    status: 'paused',
  },
];

export const StatusScreen = () => {
  const [activeTab, setActiveTab] = useState<'sending' | 'receiving'>(
    'sending',
  );
  const transfers =
    activeTab === 'sending' ? mockSendingTransfers : mockReceivingTransfers;
  const completedCount = transfers.filter(t => t.status === 'completed').length;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>传输状态</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sending' && styles.activeTab]}
          onPress={() => setActiveTab('sending')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'sending' && styles.activeTabText,
            ]}>
            发送中
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'receiving' && styles.activeTab]}
          onPress={() => setActiveTab('receiving')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'receiving' && styles.activeTabText,
            ]}>
            接收中
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.transferList}>
          {transfers.map(item => (
            <View key={item.id} style={styles.transferItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.fileName}>{item.name}</Text>
                <View style={styles.headerButtons}>
                  {item.status === 'paused' ? (
                    <PlayIcon color={colors.text} size={20} />
                  ) : (
                    item.status === 'sending' && (
                      <PauseIcon color={colors.text} size={20} />
                    )
                  )}
                  <CloseIcon color={colors.text} size={20} />
                </View>
              </View>
              <Text style={styles.deviceName}>
                {activeTab === 'sending' ? '发送至: ' : '来自: '}
                {activeTab === 'sending' ? item.to : item.from}
              </Text>
              <Text style={styles.sizeInfo}>
                {item.currentSize} / {item.totalSize}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, {width: `${item.progress}%`}]}
                />
              </View>
              {item.speed && <Text style={styles.speed}>{item.speed}</Text>}
            </View>
          ))}
        </View>
        <Text style={styles.completionText}>
          {completedCount}/{transfers.length} 文件已完成
        </Text>
      </View>
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    margin: 16,
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.background,
  },
  tabText: {
    color: colors.disabled,
    fontSize: 14,
  },
  activeTabText: {
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transferList: {
    flexGrow: 0,
  },
  transferItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 16,
    color: colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deviceName: {
    fontSize: 14,
    color: colors.disabled,
    marginTop: 8,
  },
  sizeInfo: {
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.surface,
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  speed: {
    fontSize: 12,
    color: colors.text,
    marginTop: 8,
  },
  completionText: {
    textAlign: 'center',
    color: colors.text,
    padding: 16,
  },
});
