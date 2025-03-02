/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {colors} from './src/styles/theme';
import {
  RadarIcon,
  SendIcon,
  ReceiveIcon,
  StatusIcon,
  SettingsIcon,
} from './src/components/icons';
import {HomeScreen} from './src/screens/HomeScreen';
import {SendScreen} from './src/screens/SendScreen';
import {ReceiveScreen} from './src/screens/ReceiveScreen';
import {SettingsScreen} from './src/screens/SettingsScreen';

type TabKey = 'home' | 'send' | 'receive' | 'status' | 'settings';

const routes: {key: TabKey; title: string; icon: any}[] = [
  {
    key: 'home',
    title: '主页',
    icon: RadarIcon,
  },
  {
    key: 'send',
    title: '发送',
    icon: SendIcon,
  },
  {
    key: 'receive',
    title: '接收',
    icon: ReceiveIcon,
  },
  {
    key: 'status',
    title: '状态',
    icon: StatusIcon,
  },
  {
    key: 'settings',
    title: '设置',
    icon: SettingsIcon,
  },
];

const renderScene = {
  home: () => <HomeScreen onSendFile={() => {}} />,
  send: () => <SendScreen deviceName="" onChangeDevice={() => {}} />,
  receive: () => <ReceiveScreen />,
  status: () => <View />,
  settings: () => <SettingsScreen />,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const handleSendFile = (deviceName: string) => {
    setSelectedDevice(deviceName);
    setActiveTab('send');
  };

  const handleChangeDevice = () => {
    setActiveTab('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        {activeTab === 'home' ? (
          <HomeScreen onSendFile={handleSendFile} />
        ) : activeTab === 'send' ? (
          <SendScreen
            deviceName={selectedDevice}
            onChangeDevice={handleChangeDevice}
          />
        ) : (
          renderScene[activeTab]()
        )}
      </View>
      <View style={styles.tabBar}>
        {routes.map(route => (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => setActiveTab(route.key)}>
            <route.icon
              color={activeTab === route.key ? colors.primary : colors.disabled}
              size={24}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === route.key ? colors.primary : colors.disabled,
                },
              ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    backgroundColor: colors.background,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default App;
