GIT_SHA=$(git rev-parse --short HEAD)
docker build --no-cache -t ${APP_NAME}:latest -t ${APP_NAME}:${GIT_SHA} .
