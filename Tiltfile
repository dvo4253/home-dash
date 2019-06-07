# multiple YAML files in one call
k8s_yaml(['.kube/default.yml', '.kube/ingress/proxy-service.yml'])
k8s_yaml(['.kube/ingress/ingress.yml'])

k8s_yaml('./home-dash-server/.kube/home-dash-server.yml')
k8s_yaml('./home-dash-client/.kube/home-dash-client.yml')

docker_build('home-dash-client', './home-dash-client',
  live_update=[
    # Map the local source code into the container under /src
    sync('./home-dash-client', '/app'),
    run("npm run dev")
  ])

docker_build('home-dash-server', './home-dash-server',
  live_update=[
    # Map the local source code into the container under /src
    sync('./home-dash-server', '/app'),
    run("npm run dev")
  ])
