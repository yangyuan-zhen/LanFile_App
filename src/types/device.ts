export interface Device {
    id: string;
    name: string;
    type: 'phone' | 'laptop' | 'tv' | 'server';
    ip: string;
    distance: number;
    angle: number;
    status: 'online' | 'offline';
}
