docker run --env-file=${DOCKER_DIR}/.env -d -p ${HTTP_PORT}:${HTTP_PORT} --name ${APP_NAME} ${APP_NAME}:latest
