import React from 'react';
import Svg, {Path} from 'react-native-svg';
import type {IconProps} from './types';

export const RadarIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
      fill={color}
    />
    <Path
      d="M12 5.5c-3.58 0-6.5 2.92-6.5 6.5s2.92 6.5 6.5 6.5 6.5-2.92 6.5-6.5-2.92-6.5-6.5-6.5zm0 10c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
      fill={color}
    />
  </Svg>
);

export const SendIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
      fill={color}
    />
  </Svg>
);

export const ReceiveIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 4V16M12 16L8 12M12 16L16 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M4 20H20" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const StatusIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
      fill={color}
    />
  </Svg>
);

export const SettingsIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74485 20.1656 6.23582 20.3766 5.705 20.3766C5.17418 20.3766 4.66515 20.1656 4.29 19.79C3.91435 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91435 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95231 15.6971 4.68 15.08C4.42093 14.4755 3.82758 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87231 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83435 6.74485 3.62343 6.23582 3.62343 5.705C3.62343 5.17418 3.83435 4.66515 4.21 4.29C4.58515 3.91435 5.09418 3.70343 5.625 3.70343C6.15582 3.70343 6.66485 3.91435 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95231 8.92 4.68H9C9.60447 4.42093 9.99738 3.82758 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74758 14.3955 4.34093 15 4.6C15.6171 4.87231 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83435 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83435 19.71 4.21C20.0856 4.58515 20.2966 5.09418 20.2966 5.625C20.2966 6.15582 20.0856 6.66485 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RefreshIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
      fill={color}
    />
  </Svg>
);

export const PersonIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"
      fill={color}
    />
  </Svg>
);

export const PhoneIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"
      fill={color}
    />
  </Svg>
);

export const LaptopIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"
      fill={color}
    />
  </Svg>
);

export const TvIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
      fill={color}
    />
  </Svg>
);

export const ServerIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 6H5V5h14v3zm1 4H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm-1 6H5v-3h14v3z"
      fill={color}
    />
  </Svg>
);

export const ArrowLeftIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      fill={color}
    />
  </Svg>
);

export const ChevronRightIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.29 6.71a.996.996 0 000 1.41L13.17 12l-3.88 3.88a.996.996 0 101.41 1.41l4.59-4.59a.996.996 0 000-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
      fill={color}
    />
  </Svg>
);

export const ImageFileIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
      fill={color}
    />
  </Svg>
);

export const DocumentFileIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
      fill={color}
    />
  </Svg>
);

export const AudioFileIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
      fill={color}
    />
  </Svg>
);

export const VideoFileIcon = ({color = '#000', size = 24}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"
      fill={color}
    />
  </Svg>
);

export const QrCodeIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11V3H11V11H3ZM5 9H9V5H5V9ZM3 21V13H11V21H3ZM5 19H9V15H5V19ZM13 11V3H21V11H13ZM15 9H19V5H15V9ZM13 21V13H21V21H13ZM15 19H19V15H15V19Z"
      fill={color}
    />
  </Svg>
);

export const ShareIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
      fill={color}
    />
  </Svg>
);

export const PlayIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8 5v14l11-7z" fill={color} />
  </Svg>
);

export const PauseIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill={color} />
  </Svg>
);

export const CloseIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      fill={color}
    />
  </Svg>
);

export const FolderIcon = ({color, size}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
      fill={color}
    />
  </Svg>
);
