cmd /c "npm install"
cmd /c "npm run build"
copy nodes\LiteLLM\liteLLM.svg dist\nodes\LiteLLM\liteLLM.svg
copy nodes\LiteLLM\liteLLM.svg dist\credentials\liteLLM.svg

@REM Get the container name with 'n8n' in the name and port 5678 published

set CONTAINER_NAME=docker ps -a --filter "name=n8n" --filter "publish=5678"
for /f "tokens=1" %%i in ('%CONTAINER_NAME% --format "{{.Names}}"') do set CONTAINER_NAME=%%i

@REM N8N_CUSTOM_EXTENSIONS is set in docker-compose.yml = /home/node/.n8n/custom/
docker exec %CONTAINER_NAME% mkdir -p /home/node/.n8n/custom/
docker cp dist/. %CONTAINER_NAME%:/home/node/.n8n/custom/

docker restart %CONTAINER_NAME%