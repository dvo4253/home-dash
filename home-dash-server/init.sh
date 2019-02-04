export APP_NAME=home-dash-server

. $(brew --prefix nvm)/nvm.sh
unset npm_config_prefix
nvm use
export NODE_ENV=development
export BABEL_ENV=development

export HTTP_PORT=9000
export HTTPS_PORT=9443
export HOME_DASH_NEST_REDIRECT_URL='https%3A%2F%2Fdev.home.local%3A8443%2Fnest%2Fauth
export DOCKER_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )/docker"
