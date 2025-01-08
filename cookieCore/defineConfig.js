const {merge} = require("lodash");
const defaultConfig = require("./defaultConfig");

/**
 * @typedef {{
 *     host: string,
 *     port: number,
 * }} ServerConfig
 */

/**
 * @param {{
 *     rootDir: string,
 *     getComponentGroup: (infoList: { filePath: string, name: string }[]) => Object,
 *     cookieServer: ServerConfig,
 *     cookiePageServer: ServerConfig,
 * }} config
 */
const defineConfig = config => {
    return merge(defaultConfig, config);
};

module.exports = defineConfig;
