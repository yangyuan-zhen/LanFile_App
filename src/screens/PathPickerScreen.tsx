import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {colors} from '../styles/theme';
import {ArrowLeftIcon, FolderIcon} from '../components/icons';

interface PathPickerProps {
  currentPath: string;
  onPathSelect: (path: string) => void;
  onClose: () => void;
}

const mockDirs = [
  {id: '1', name: 'Download'},
  {id: '2', name: 'Documents'},
  {id: '3', name: 'Pictures'},
  {id: '4', name: 'Movies'},
];

export const PathPickerScreen = ({
  currentPath,
  onPathSelect,
  onClose,
}: PathPickerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <ArrowLeftIcon size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>选择路径</Text>
      </View>

      <Text style={styles.currentPath}>{currentPath}</Text>

      <FlatList
        data={mockDirs}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.dirItem}
            onPress={() => onPathSelect(`/${item.name}`)}>
            <FolderIcon size={24} color={colors.text} />
            <Text style={styles.dirName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
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
  currentPath: {
    fontSize: 14,
    color: colors.disabled,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dirItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  dirName: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
});
