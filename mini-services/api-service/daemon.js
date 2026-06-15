import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = fs.createWriteStream(path.join(__dirname, 'api-service.log'), { flags: 'a' });

function startServer() {
  log.write(`[daemon] Starting API service at ${new Date().toISOString()}\n`);

  const server = spawn('bun', ['index.ts'], {
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (d) => { log.write(d); });
  server.stderr.on('data', (d) => { log.write(d); });

  server.on('exit', (code, signal) => {
    log.write(`[daemon] Server exited code=${code} signal=${signal}, restarting in 3s...\n`);
    setTimeout(startServer, 3000);
  });

  server.on('error', (err) => {
    log.write(`[daemon] Server error: ${err.message}\n`);
  });
}

startServer();
