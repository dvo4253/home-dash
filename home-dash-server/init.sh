export APP_NAME=home-dash-server

. $(brew --prefix nvm)/nvm.sh
unset npm_config_prefix
nvm use
export NODE_ENV=development
export BABEL_ENV=development

export HTTP_PORT=9000
export HTTPS_PORT=9443

export DOCKER_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )/docker"
