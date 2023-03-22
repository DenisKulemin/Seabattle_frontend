# Seabattle-frontend

## Local setup

1) Build docker container with app:

```commandline
cd docker
docker compose build
```

2) Add BASE_URL env variable. This variable should contain URL to seabattle backend container.
By default, for local using it will be http://seabattle:8080 (because both containers should be 
in the same docker network).

3) Up the container:

```commandline
docker compose up
```

4) Open http://localhost:8081 in browser.
