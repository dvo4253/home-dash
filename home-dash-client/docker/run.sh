docker run --env-file=${DOCKER_DIR}/.env -d -p ${HTTP_PORT}:${HTTP_PORT} -p ${HTTPS_PORT}:${HTTPS_PORT} -p 3000:3000 --name ${APP_NAME} ${APP_NAME}:latest
