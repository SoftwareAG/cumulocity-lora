proxy_params=""
if [ -n "$PROXY_HTTP_HOST" ]; then proxy_params="-Dhttp.proxyHost=${PROXY_HTTP_HOST} -DproxyHost=${PROXY_HTTP_HOST}"; fi
if [ -n "$PROXY_HTTP_PORT" ]; then proxy_params="${proxy_params} -Dhttp.proxyPort=${PROXY_HTTP_PORT} -DproxyPort=${PROXY_HTTP_PORT}"; fi
if [ -n "$PROXY_HTTP_NON_PROXY_HOSTS" ]; then proxy_params="${proxy_params} -Dhttp.nonProxyHosts=\"${PROXY_HTTP_NON_PROXY_HOSTS}\""; fi
if [ -n "$PROXY_HTTPS_HOST" ]; then proxy_params="${proxy_params} -Dhttps.proxyHost=${PROXY_HTTPS_HOST}"; fi
if [ -n "$PROXY_HTTPS_PORT" ]; then proxy_params="${proxy_params} -Dhttps.proxyPort=${PROXY_HTTPS_PORT}"; fi
if [ -n "$PROXY_SOCKS_HOST" ]; then proxy_params="${proxy_params} -DsocksProxyHost=${PROXY_SOCKS_HOST}"; fi
if [ -n "$PROXY_SOCKS_PORT" ]; then proxy_params="${proxy_params} -DsocksProxyPort=${PROXY_SOCKS_PORT}"; fi

echo "Proxy settings found: " $proxy_params

mkdir -p /var/log/@package.name@; echo "heap dumps  /var/log/@package.name@/heap-dump-<pid>.hprof"

java -XX:MinRAMPercentage=60.0 -XX:MaxRAMPercentage=90.0 -XX:+HeapDumpOnOutOfMemoryError -XshowSettings:vm ${proxy_params} -jar /data/@package.name@.jar