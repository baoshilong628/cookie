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
        console.log(group);
        return group;
    }
});