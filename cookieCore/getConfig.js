
// 获取命令运行cwd下的inspector.config.js
const fs = require("node:fs");
const {isObject} = require("lodash/lang");
const {join} = require("node:path");
const {CONFIG_FILE_NAME} = require("./constants");

const getConfig = () => {
    const configPath = join(process.cwd(), CONFIG_FILE_NAME);
    // 没有这个文件提示用户将使用默认config
    if (!fs.existsSync(configPath)) {
        console.log(`没有找到${CONFIG_FILE_NAME}文件，将使用默认config`);
        return require('./defaultConfig');
    }
    const config = require(configPath);
    if (!isObject(config)) {
        console.log(`${CONFIG_FILE_NAME}文件不是一个对象，将使用默认config}`);
        return require('./defaultConfig');
    }
    return config;
}
module.exports = getConfig;