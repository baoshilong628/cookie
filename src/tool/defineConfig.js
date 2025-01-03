const {merge} = require("lodash");
const defaultConfig = require("./defaultConfig");

/**
 * @param {{
 *     rootDir
 * }} config
 */
const defineConfig = config => {
    return merge(defaultConfig, config);
};

module.exports = defineConfig;
