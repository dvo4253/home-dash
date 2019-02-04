
cmd=$@

while [[ "${STATUS}" != "200" ]]; do
    STATUS=$(curl -s -o /dev/null -w ''%{http_code}'' http://localhost:9000/home-dash-api/health)

    echo "Status ~~ (${STATUS})"
    if [[ "${STATUS}" != "200" ]]; then
        sleep 5
    fi
done

exec $cmd
