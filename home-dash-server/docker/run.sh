docker run --env-file=${DOCKER_DIR}/.env -d -p ${HTTP_PORT}:${HTTP_PORT} ${APP_NAME}:latest
