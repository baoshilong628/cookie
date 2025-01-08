const parser = require('@babel/parser');
const fs = require("node:fs");
const path = require("node:path");
const cors = require('cors');
const { createServer } = require('vite');
const {debounce} = require("lodash");
const docParse = require('./parser');

// 使用@babel/traverse遍历AST，找到箭头函数的leadingComments
const traverse = require('@babel/traverse').default;

// 基于以上原理，实现一个函数，输入为文件路径，输出为该文件所有的leadingComments

class Doc {
  filePath;
  name; // 变量名或函数名
  leadingComments;
  params;
  comment; // 解析后的评论注释，评论注释写在注释的最上面
  displayName; // 组件的展示名称
}

// 这个结构保存着一个文件的所有Doc
class FileDocs {
  filePath;
  docs;
}

class Param {
  name; // 参数名称
  type; // 参数类型
  comment; // 参数注释
  defaultValue; // 参数默认值
  isRequired; // 是否为必填参数
}

const getLeadingComments = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(code, {
    sourceType:'module',
    plugins: ['jsx']
  });
  const docs = [];
  traverse(ast, {
    FunctionDeclaration: function (path) {
      const doc = new Doc();
      doc.filePath = filePath;
      doc.name = path.node.id.name;
      const leadingComments = path.node.leadingComments;
      if (leadingComments && leadingComments.length > 0) {
        doc.leadingComments = leadingComments.map(comment => comment.value);
      }
      docs.push(doc);
    },
    VariableDeclaration: function (path) {
      const doc = new Doc();
      doc.filePath = filePath;
      doc.name = path.node.declarations[0].id.name;
      const leadingComments = path.node.leadingComments;
      if (leadingComments && leadingComments.length > 0) {
        doc.leadingComments = leadingComments.map(comment => comment.value);
      }
      docs.push(doc);
    }
  });
  return docs;
};

const parseLeadingComments = (docs) => {
  docs.forEach(doc => {
    if (doc.leadingComments) {
      const leadingCommentsString = `/*${doc.leadingComments.at(-1)}*/`;
      const res = docParse.parse(leadingCommentsString);
      doc.params = res
          .filter(({ type }) => type === 'param')
          .map(({ value }) => value)
          .map(({ comment, type, variable }) => {
            const param = new Param();
            param.name = variable.name;
            param.type = type?.type ?? 'any';
            param.comment = comment;
            param.defaultValue = variable.value;
            param.isRequired = type?.isRequired;
            return param;
          });
      doc.displayName = res.find(({ type }) => type === 'displayName')?.value?.name;
      doc.comment = res.filter(({ type }) => type === 'descriptionLine')
          .map(({ value }) => value)
          .join('\n');
    }
  });
  return docs;
};

const parseComment = (docs) => {
  const commentRegex = /^\s*\*\s*(.+)/;
  const jsDocLineReg = /^\s*\*\s*@/;
  docs.forEach(doc => {
    if (doc.leadingComments) {
      doc.comment = '';
      doc.leadingComments.forEach(comment => {
        const lines = comment.split(/\r?\n/);
        lines.filter(line => !jsDocLineReg.test(line))
            .forEach(line => {
          const match = line.match(commentRegex);
          if (match) {
            doc.comment += match[1] + '\n';
          }
        });
      });
    }
  });
  return docs;
};



// 利用以上工具，实现函数，输入是（文件路径，Doc数组保存路径），没有输出，副作用是将解析后的Doc数组以json形式报错
const saveDocs = (filePath, docAssetsPath) => {
  const docs = getLeadingComments(filePath);
  const docs2 = parseLeadingComments(docs);
  const jsonString = JSON.stringify(docs2, null, 2);
  fs.writeFileSync(docAssetsPath, jsonString);
};


// 基于文件路径生成Doc数组，之后开启一个express服务器提供对该数组的访问
const openDocServer = (filePath) => {
  const docs = getLeadingComments(filePath);
  const docs2 = parseLeadingComments(docs);
  const express = require('express');
  const app = express();
  // 使用 cors 中间件
  app.use(cors());
  app.get('/docs', (req, res) => {
    res.send(docs2);
  });
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
};

// 获取文件夹下所有文件的路径
const getFilePathsFromFolder = (folderPath, regex) => {
  const files = fs.readdirSync(folderPath, { withFileTypes: true });
  const filePaths = [];

  files.forEach((file) => {
    const filePath = path.join(folderPath, file.name);
    if (file.isFile() && regex.test(filePath)) {
      filePaths.push(filePath);
    } else if (file.isDirectory()) {
      const subFolderPaths = getFilePathsFromFolder(filePath, regex);
      filePaths.push(...subFolderPaths);
    }
  });

  return filePaths;
};


// 从文件路径获取文档对象
const getFileDocs = (filePath) => {
  const docs = getLeadingComments(filePath);
  return parseLeadingComments(docs);
};

// 入参是文件夹路径，出参是FileDocs数组，这个函数会遍历文件夹下的所有文件，生成一个FileDocs数组
const getDocsFromFolder = (folderPath) => {
  const filePaths = getFilePathsFromFolder(folderPath, /\.js$/);
  return filePaths.map(filePath => ({
    filePath,
    docs: getFileDocs(filePath),
  }));
};

const getComponentId = doc => {
  return `${doc.name}-${encodeURI(doc.filePath)}`;
}

const getComponentInfoListFromFileDocs = (fileDocs) => {
  const componentInfoList = [];
  fileDocs.forEach(fileDoc => {
    fileDoc.docs.forEach(doc => {
      componentInfoList.push({
        filePath: fileDoc.filePath,
        name: doc.name,
        displayName: doc.displayName,
        comment: doc.comment,
        params: doc.params,
        id: getComponentId(doc),
      });
    });
  });
  return componentInfoList;
};

// 入参是文件夹路径，副作用是开启一个FileDocs服务器
const openFileDocsServer = (folderPath) => {
  const { host, port } = global.config.cookieServer;
  let data = {
  };
  const initData = () => {
    data.fileDocs = getDocsFromFolder(folderPath);
    data.componentGroups = config.getComponentGroup(getComponentInfoListFromFileDocs(data.fileDocs));
  };
  initData();
  const express = require('express');
  const app = express();
  // 使用 cors 中间件
  app.use(cors());
  app.get('/fileDocs', (req, res) => {
    res.send(data.fileDocs);
  });
  app.get('/componentGroups', (req, res) => {
    res.send(data.componentGroups);
  });
  app.listen(port, host, () => {
    console.log(`Server started on port ${global.config.cookieServer.port}`);
  });
  return initData;
};

// 监听文件夹，当文件夹下任意文件发生变化时，调用回调函数
const watchFolder = (folderPath, callback) => {
  const cb = debounce(callback, 500);
  fs.watch(folderPath, { recursive: true }, (eventType, filename) => {
    if (eventType === 'change') {
      const filePath = path.join(folderPath, filename);
      cb(filePath);
    }
  });
};

// 调用vite开启调试服务器，
const openViteServer = async () => {
  const { host, port } = global.config.cookiePageServer;
  const { host: apiHost, port: apiPort } = global.config.cookieServer;
  const server = await createServer({
    server: {
      host,
      port,
      proxy: {
        '/api': {
          target: `http://${apiHost}:${apiPort}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    root: path.join(__dirname, '../'),
  });

  server.listen().then(() => {
    console.log(`Vite server started on port ${global.config.cookiePageServer.port}`);
  }).catch(e => console.log(e));

  return {
    reload: () => {
      server.ws.send({ type: 'full-reload' });
    }
  };
};


module.exports = {
  openFileDocsServer,
  openViteServer,
  watchFolder,
};