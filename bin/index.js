#!/usr/bin/env node
const path = require('path');
const {openFileDocsServer, openViteServer, watchFolder} = require("../src/tool");
const docPath = path.resolve(process.cwd(), 'assets');

console.log('当前命令执行路径:', process.cwd());

console.log('Hello, World! This is my CLI tool.');

// 文档路径是
console.log('文档路径是:', docPath);

// 启动文档服务
const refresh = openFileDocsServer(docPath);

// 启动Vite
openViteServer()
    .then(({ reload }) => {
      // 监听文档路径
      watchFolder(docPath, () => {
        refresh();
        reload();
      });
    });

// 自动打开localhost:3001
const { exec } = require('child_process');
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

