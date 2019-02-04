. $(brew --prefix nvm)/nvm.sh
nvm use
export HTTP_PORT=8000
export HTTPS_PORT=8443
export WEBPACK_DEV_SERVER_PORT=3000

export NODE_ENV=development
export BABEL_ENV=development
export APP_NAME=home-dash-client

export HOME_DASH_API_ROUTE=http://localhost:9000/home-dash-api
export HOME_DASH_DOMAIN=https://localhost
export DOCKER_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )/docker"
