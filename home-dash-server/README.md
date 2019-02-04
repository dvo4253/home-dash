# Initial Express Server framework

execute `. init.sh`

This sets environment variables for working locally and in a docker container
Also uses the appropriate npm version using nvm
If the correct version of node is not installed then install using nvm

Then run `. init.sh` again

Run in a docker container

`sh docker/build.sh`

- Builds the container with the `latest` tag and the short commit SHA of the last commit

`sh docker/run.sh`

- Runs the container with the appropriate ports exposed

## ENVIRONMENT VARIBLES

NEST_CLIENT_ID
NEST_SECRET_ID
