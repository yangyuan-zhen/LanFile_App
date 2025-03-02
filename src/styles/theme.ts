import { StyleSheet } from 'react-native';

// 全局颜色定义
export const colors = {
    primary: '#2196F3',
    secondary: '#5856D6', // 深紫蓝辅助色
    background: '#FFFFFF', // 白色背景
    surface: '#F5F5F5',
    accent: '#30B0C7', // 青蓝强调色
    text: '#000000', // 主文本色
    disabled: '#BDBDBD',
    placeholder: '#8E8E93', // 占位文本色
    backdrop: 'rgba(0, 0, 0, 0.5)', // 遮罩层
    primaryLight: '#92B1F5', // RGB(146,177,245) 淡蓝色
};

// 暗色主题色板
export const darkColors = {
    ...colors,
    primary: '#0A84FF',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
};

// 全局样式
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    padding: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // 添加其他常用样式...
});

// 间距和尺寸常量
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

// 字体大小常量
export const typography = {
    title: 24,
    subtitle: 20,
    body: 16,
    caption: 14,
};
