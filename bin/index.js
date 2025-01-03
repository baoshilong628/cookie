#!/usr/bin/env node
const path = require('path');
const {openFileDocsServer, openViteServer, watchFolder} = require("../src/tool");
const { exec } = require('child_process');
const getConfig = require("../src/tool/getConfig");

const config = getConfig();

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

// 自动打开localhost:3001

exec('start http://localhost:3001', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行命令时发生错误: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`命令的标准错误输出: ${stderr}`);
    return;
  }
  console.log(`命令的标准输出: ${stdout}`);
});

