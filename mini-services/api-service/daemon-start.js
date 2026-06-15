import { spawn } from 'child_process';
import { writeFileSync, existsSync } from 'fs';

const PID_FILE = '/tmp/api-service.pid';

function startServer() {
  const child = spawn('bun', ['index.ts'], {
    cwd: '/home/z/my-project/mini-services/api-service',
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (data) => {
    console.log(`[api-service] ${data.toString().trim()}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`[api-service error] ${data.toString().trim()}`);
  });

  child.unref();
  
  writeFileSync(PID_FILE, String(child.pid));
  console.log(`API service started with PID ${child.pid}`);
}

startServer();
