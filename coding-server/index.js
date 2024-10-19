const http = require('http');
const express = require('express');
const fs = require('fs').promises;
const fsSync = require('fs');
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const cors = require('cors');
const chokidar = require('chokidar');
const pty = require('node-pty');

// Ensure user directory exists
const userDir = path.join(__dirname, 'user');
if (!fsSync.existsSync(userDir)) {
  fsSync.mkdirSync(userDir);
}

const ptyProcess = pty.spawn('bash', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: userDir,
  env: process.env
});

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "*"
}));

chokidar.watch(userDir).on('all', (event, path) => {
  io.emit('file:refresh', path);
});

ptyProcess.on('exit', (exitCode, signal) => {
  console.log(`Process exited with code ${exitCode} and signal ${signal}`);
});

ptyProcess.on('error', (error) => {
  console.error('pty process error:', error);
});

ptyProcess.onData(data => {
  console.log(data);
  io.emit('terminal:data', data);
});

io.on('connection', (socket) => {
  console.log(`Socket connected`, socket.id);
  socket.emit('file:refresh');

  socket.on('file:change', async ({ path: filePath, content }) => {
    await fs.writeFile(path.join(userDir, filePath), content);
  });

  socket.on('terminal:write', (data) => {
    console.log('Term', data);
    ptyProcess.write(data);
  });
});

app.get('/files', async (req, res) => {
  const fileTree = await generateFileTree(userDir);
  return res.json({ tree: fileTree });
});

app.get('/files/content', async (req, res) => {
  const filePath = req.query.path;
  const content = await fs.readFile(path.join(userDir, filePath), 'utf-8');
  return res.json({ content });
});

server.listen(9000, () => console.log(`🐳 Docker server running on port 9000`));

server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function generateFileTree(directory) {
  const tree = {};
  async function buildTree(currentDir, currentTree) {
    const files = await fs.readdir(currentDir);
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        currentTree[file] = {};
        await buildTree(filePath, currentTree[file]);
      } else {
        currentTree[file] = null;
      }
    }
  }
  await buildTree(directory, tree);
  return tree;
}