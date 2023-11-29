#npm run build
#docker build -t frontend .
docker run -d -p 80:80 -e PROXY_PASS=http://host.docker.internal:8080 frontend