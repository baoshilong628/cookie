const {merge} = require("lodash");
const defaultConfig = require("./defaultConfig");

/**
 * @param {{
 *     rootDir: string,
 *     getComponentGroup: (infoList: { filePath: string, name: string }[]) => Object,
 * }} config
 */
const defineConfig = config => {
    return merge(defaultConfig, config);
};

module.exports = defineConfig;
