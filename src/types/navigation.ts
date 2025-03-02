import { Device } from './device';

export type RootStackParamList = {
    Main: undefined;
    Send: {
        device: Device;
    };
};
