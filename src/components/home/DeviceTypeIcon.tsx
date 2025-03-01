import React from 'react';
import {Device} from '../../types/device';
import {PhoneIcon, LaptopIcon, TvIcon, ServerIcon} from '../icons';

export const DeviceTypeIcon = ({
  type,
  color,
  size,
}: {
  type: Device['type'];
  color: string;
  size: number;
}) => {
  switch (type) {
    case 'phone':
      return <PhoneIcon color={color} size={size} />;
    case 'laptop':
      return <LaptopIcon color={color} size={size} />;
    case 'tv':
      return <TvIcon color={color} size={size} />;
    case 'server':
      return <ServerIcon color={color} size={size} />;
    default:
      return null;
  }
};
