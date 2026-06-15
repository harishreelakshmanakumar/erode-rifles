#!/bin/bash
while true; do
    cd /home/z/my-project/mini-services/api-service
    bun index.ts
    echo "[$(date)] API service exited, restarting in 3s..." >> /tmp/api-service-daemon.log
    sleep 3
done
