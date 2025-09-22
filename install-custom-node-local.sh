npm install
npm run build
cp nodes/LiteLLM/liteLLM.svg dist/nodes/LiteLLM/liteLLM.svg
cp nodes/LiteLLM/liteLLM.svg dist/credentials/liteLLM.svg

# Get the container name with 'n8n' in the name and port 5678 published
CONTAINER_NAME=$(docker ps -a --filter "name=n8n" --filter "publish=5678" --format "{{.Names}}" | head -n 1)

# N8N_CUSTOM_EXTENSIONS is set in docker-compose.yml = /home/node/.n8n/custom/
docker exec "$CONTAINER_NAME" mkdir -p /home/node/.n8n/custom/
docker cp dist/. "$CONTAINER_NAME":/home/node/.n8n/custom/
docker restart "$CONTAINER_NAME"