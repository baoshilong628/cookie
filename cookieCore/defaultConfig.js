const defaultConfig = {
    rootDir: './',
    getComponentGroup: componentInfoList => {
        return {
            '所有组件': componentInfoList
        }
    },
    cookieServer: {
        host: 'localhost',
        port: 43675
    },
    cookiePageServer: {
        host: 'localhost',
        port: 43676
    }
};

module.exports = defaultConfig;