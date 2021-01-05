# VAI Challenge

### How to run the project

You can run the project in "production mode" and in "development mode". The development mode supports hot reload and execute tests while developing.


**Development mode**
```shell
docker-compose -f docker-compose-dev.yaml up --build
```

**Production mode**
```shell
docker-compose -f docker-compose.yaml up --build -d
```

## How to use the API
The API has the following routes:

POST - /complexity

Which receives a JSON as the request body with the field 'text', as example:

```json
{
  "text": "Kim loves going to the cinema"
}
```

POST - /non-lexical-word

This route requires an header called `x-api-key` the value should be the same as the API_KEY environment variable set on the container.

The request body should be a JSON with the field 'word', as example:
```json
{
  "word": "test"
}
```
