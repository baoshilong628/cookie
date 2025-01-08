#!/usr/bin/env node
const path = require('path');
const {openFileDocsServer, openViteServer, watchFolder} = require("../cookieCore");
const { exec } = require('child_process');
const getConfig = require("../cookieCore/getConfig");

const config = getConfig();

global.config = config;

const root = path.join(process.cwd(), config.rootDir);

// 启动文档服务
const refresh = openFileDocsServer(
    root
);

// 启动Vite
openViteServer()
    .then(({ reload }) => {
      // 监听文档路径
      watchFolder(root, () => {
        refresh();
        reload();
      });
    });

// 自动打开cookie page
exec(`start http://localhost:${config.cookiePageServer.port}`);

