import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../styles/theme';
import {ArrowLeftIcon} from '../components/icons';

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'audio' | 'video';
  size: string;
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'vacation.jpg',
    type: 'image',
    size: '2.5 MB',
  },
  {
    id: '2',
    name: 'presentation.pdf',
    type: 'document',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'song.mp3',
    type: 'audio',
    size: '4.2 MB',
  },
  {
    id: '4',
    name: 'movie.mp4',
    type: 'video',
    size: '350 MB',
  },
];

export const SendScreen = () => {
  const [selectedTab, setSelectedTab] = useState<
    'all' | 'image' | 'video' | 'document'
  >('all');

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>选择文件</Text>
      </View>

      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>发送至</Text>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>更改 ›</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.deviceName}>Phone-A</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}>
          <Text style={styles.tabText}>全部</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'image' && styles.activeTab]}
          onPress={() => setSelectedTab('image')}>
          <Text style={styles.tabText}>照片</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'video' && styles.activeTab]}
          onPress={() => setSelectedTab('video')}>
          <Text style={styles.tabText}>视频</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'document' && styles.activeTab]}
          onPress={() => setSelectedTab('document')}>
          <Text style={styles.tabText}>文档</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fileList}>
        {mockFiles.map(file => (
          <TouchableOpacity key={file.id} style={styles.fileItem}>
            <View style={styles.fileIcon} />
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{file.name}</Text>
              <Text style={styles.fileSize}>{file.size}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.text,
  },
  changeButton: {
    padding: 8,
  },
  changeButtonText: {
    color: colors.primary,
    fontSize: 14,
  },
  deviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    color: colors.text,
    fontSize: 14,
  },
  fileList: {
    flex: 1,
    padding: 16,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    color: colors.disabled,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  topTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
});
