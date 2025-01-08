const defaultConfig = {
    rootDir: './',
    getComponentGroup: componentInfoList => {
        return {
            '所有组件': componentInfoList
        }
    }
};

module.exports = defaultConfig;