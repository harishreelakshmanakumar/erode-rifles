import { spawn } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = fs.createWriteStream(path.join(__dirname, 'dev.log'), { flags: 'w' });

function startServer() {
  const server = spawn('node', ['node_modules/.bin/next', 'dev', '-p', '3000'], {
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (d) => { log.write(d); });
  server.stderr.on('data', (d) => { log.write(d); });

  server.on('exit', (code, signal) => {
    log.write(`[daemon] Server exited code=${code} signal=${signal}, restarting in 3s...\n`);
    setTimeout(startServer, 3000);
  });
}

startServer();
