import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>设置</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
});
