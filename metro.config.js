const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    watchFolders: [path.resolve(__dirname, 'src')],
    resetCache: true,
    server: {
        port: 8081,
        host: 'localhost',
        hmr: true,
        enhanceMiddleware: (middleware) => {
            return (req, res, next) => {
                console.log('Metro is serving request:', req.url);
                if (req.url.includes('index.bundle')) {
                    console.log('Bundle request detected');
                }
                return middleware(req, res, next);
            };
        },
    },
    reporter: {
        update: (event) => {
            if (event.type === 'client_log') {
                console.log('Client log:', event.data);
            }
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
