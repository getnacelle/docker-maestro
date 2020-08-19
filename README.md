# Docker Maestro
A way to orchestrate your team's `docker-compose.yml` files based on one source of truth , your `docker-maestro.yml`

## Usage
```
docker-maestro generate             Regenerate Compose file from Maestro
docker-maestro use-image [service]  Switch a service to image
docker-maestro use-local [service]  Switch a service to local
```

Example Maestro file:
```yaml
web:
  use-image:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
    links:
    - redis
  use-local:
    volumes:
    - .:/local
    links:
    - redis
redis:
  use-always:
    image: redis
networks:
  default:
    external:
      name: my-pre-existing-network
```

`volumes:` and `networks:` are reserved top level configuration names. They will get generated out to the respective field, not under `services:` in your docker-compose.yml

Execute `docker-maestro --help` for more.