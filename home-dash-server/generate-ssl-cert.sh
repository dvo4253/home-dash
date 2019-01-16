CONFIG_FILE='./docker/ssl/openssl.cnf'

echo [ req ] > ${CONFIG_FILE}
echo prompt = no >> ${CONFIG_FILE}
echo distinguished_name = req_distinguished_name >> ${CONFIG_FILE}
echo [ req_distinguished_name ] >> ${CONFIG_FILE}
echo C = IE >> ${CONFIG_FILE}
echo ST = Test State >> ${CONFIG_FILE}
echo L = Test Locality >> ${CONFIG_FILE}
echo O = Org Name >> ${CONFIG_FILE}
echo OU = Org Unit Name >> ${CONFIG_FILE}
echo CN = Common Name >> ${CONFIG_FILE}
echo emailAddress = test@email.com >> ${CONFIG_FILE}

openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -config docker/ssl/openssl.cnf -out docker/ssl/dev.crt -keyout docker/ssl/dev.key
