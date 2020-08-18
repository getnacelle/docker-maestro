# Docker Maestro
A way to orchestrate your team's `docker-compose.yml` files based on one source of truth , your `docker-maestro.yml`

## Examples
Execute `docker-maestro generate` in the same directory as your `docker-maestro.yml` to generate a matching `docker-compose.yml` file for that configuration.

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
```

- `docker-maestro use-image [service]` Switch a service to image

- `docker-maestro use-local [service]` Switch a service to local

Execute `docker-maestro --help` for more.