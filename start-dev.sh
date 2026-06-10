#!/bin/bash
cd /home/z/my-project
while true; do
  echo "[start-dev] Starting Next.js at $(date)" >> /home/z/my-project/dev.log
  node_modules/.bin/next dev -p 3000 >> /home/z/my-project/dev.log 2>&1
  EXIT_CODE=$?
  echo "[start-dev] Server exited with code $EXIT_CODE at $(date)" >> /home/z/my-project/dev.log
  sleep 3
done
