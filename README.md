# Spring Configuration Example

### Prerequisites
* Java 17
* Docker
* NPM

### Starting Consul
* Navigate to `./docker` folder
* Run `docker compose up -d`
* Navigate to `http://localhost:8500` and confirm Consul is up and running

### Run Micro Services from IDE
* Open up the `./pom.xml` file in your favorite IDE (I used IntelliJ)
* Run `GatewayApplication` (port 8080)
* Run `ConfigServiceMain` (random port)
* Run `MessageServiceMain` (random port)
* Run `UserServiceMain` (random port)

The Gateway application is on Port 8080 and is the entry point to your micro-services.  The `application.yml` in this project deines the route points.  For this we follow the naming convention of:  [GatewayURL]/[ServiceName]/[ServiceEndpoint]

### Run Frontend
* Open the `./frontend` folder
* Install dependencies with `npm install`
* Start React app in dev mode with `npm run dev`
