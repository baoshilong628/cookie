const {defineConfig} = require("./index");

module.exports = defineConfig({
    rootDir: './example',
    getComponentGroup: infoList => {
        const group = {
            '其他组件': [],
            '一般组件': [],
        }
        for (const info of infoList) {
            const filePath = info.filePath
            if (filePath.includes('other')) {
                group['其他组件'].push(info)
            } else {
                group['一般组件'].push(info)
            }
        }
        return group;
    },
    cookieServer: {
        host: 'localhost',
        port: 1234
    },
    cookiePageServer: {
        host: 'localhost',
        port: 1235
    }
});