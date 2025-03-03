import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../styles/theme';
// import type {Device} from '../types/device';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ImageFileIcon,
  DocumentFileIcon,
  AudioFileIcon,
  VideoFileIcon,
} from '../components/icons';

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

const FileTypeIcon = ({type, size}: {type: FileItem['type']; size: number}) => {
  switch (type) {
    case 'image':
      return <ImageFileIcon size={size} color={colors.text} />;
    case 'document':
      return <DocumentFileIcon size={size} color={colors.text} />;
    case 'audio':
      return <AudioFileIcon size={size} color={colors.text} />;
    case 'video':
      return <VideoFileIcon size={size} color={colors.text} />;
    default:
      return null;
  }
};

interface SendScreenProps {
  deviceName: string | null;
  onBack: () => void;
}

export const SendScreen = ({deviceName, onBack}: SendScreenProps) => {
  const [selectedTab, setSelectedTab] = useState<
    'all' | 'image' | 'video' | 'document'
  >('all');

  const filteredFiles = mockFiles.filter(file => {
    switch (selectedTab) {
      case 'image':
        return file.type === 'image';
      case 'video':
        return file.type === 'video';
      case 'document':
        return file.type === 'document';
      default:
        return true; // 'all' 标签显示所有文件
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>选择文件</Text>
      </View>

      <View style={styles.headerCard}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>发送至</Text>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => console.log('更改')}>
            <View style={styles.changeButtonContent}>
              <Text style={styles.changeButtonText}>更改</Text>
              <ChevronRightIcon size={16} color={colors.text} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.deviceName}>
          {deviceName ? deviceName : '未选择设备'}
        </Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'all' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('all')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'all' && styles.activeTabText,
            ]}>
            全部
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'image' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('image')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'image' && styles.activeTabText,
            ]}>
            照片
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'video' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('video')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'video' && styles.activeTabText,
            ]}>
            视频
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'document' && styles.activeTabButton,
          ]}
          onPress={() => setSelectedTab('document')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'document' && styles.activeTabText,
            ]}>
            文档
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fileList}>
        {filteredFiles.map(file => (
          <TouchableOpacity key={file.id} style={styles.fileItem}>
            <View style={styles.fileIcon}>
              <FileTypeIcon type={file.type} size={24} />
            </View>
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
  },
  headerCard: {
    padding: 16,
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
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
    backgroundColor: colors.background,
    borderRadius: 6,
  },
  changeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changeButtonText: {
    color: colors.text,
    fontSize: 14,
    marginRight: 4,
  },
  deviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 2,
    margin: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: colors.background,
  },
  tabText: {
    color: colors.disabled,
    fontSize: 14,
  },
  activeTabText: {
    color: colors.text,
  },
  fileList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 8,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginRight: 8,
    marginTop: 6,
  },
  topTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
});
