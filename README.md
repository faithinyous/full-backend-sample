# Full backend docker + typeorm + postgres + rediscache

## Usage

```bash
docker-compose build
docker-compose up -d
```

## Prepare sample data

```SQL
INSERT INTO "user"
VALUES ('e4ad8a4b-3d7a-4156-ac15-75f89d3fd22d', 'a', 'a');
INSERT INTO "user"
VALUES ('661eca60-c189-420c-9ad8-83cb9a4412d7', 'b', 'b');
INSERT INTO "user"
VALUES ('9d878795-b00e-47db-8ea8-7db277174c96', 'c', 'c');

INSERT INTO "book"
VALUES ('8ad1029b-f816-43b2-aad6-da890e2ee170', 1, 'e4ad8a4b-3d7a-4156-ac15-75f89d3fd22d');
INSERT INTO "book"
VALUES ('f0669e9b-078d-410b-9680-2b893c176843', 2, 'e4ad8a4b-3d7a-4156-ac15-75f89d3fd22d');
INSERT INTO "book"
VALUES ('8eeb9ea3-cdf8-4b22-b991-56343a721bcf', 3, 'e4ad8a4b-3d7a-4156-ac15-75f89d3fd22d');

```

## Test

```bash
curl http://localhost:5001/users
curl http://localhost:5001/user/{id}
```



