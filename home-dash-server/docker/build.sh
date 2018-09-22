
GIT_SHA=$(git rev-parse --short HEAD)
docker build -t ${APP_NAME}:latest -t ${APP_NAME}:${GIT_SHA} .
