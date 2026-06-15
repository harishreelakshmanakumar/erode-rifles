#!/bin/bash
# Start API service and keep it alive
cd /home/z/my-project/mini-services/api-service

while true; do
    echo "Starting API service..."
    bun index.ts
    echo "API service stopped. Restarting in 2 seconds..."
    sleep 2
done
