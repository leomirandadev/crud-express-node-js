# STARTING PROJECT NODE.JS - REST API

## First Step

### Start project command

```
yarn init -y
```

ps.: Created package.json

### Add Express on project for REST application

```
yarn add express
```

## Second Step

### Nodemon is use to keep server online and updated. Install with:

```
yarn add nodemon -D
```

After install, add on package.json

```json
"scripts": {
    "dev": "nodemon index.js"
}
```

For put server online, write:

```
yarn dev
```

## Third Step

Create index.js and start code!!

# KNOWLEDGES

## EXPRESS

### If you want send a string to client:

```js
return res.send("String");
```

### If you want send a json object to client:

```js
return res.json({ object: 0 });
```

### There are three types of request params:

- Query params = /?name=YourName => req.query.name
- Route params = /user/1 => /user/:id = req.params.id
- Request body = { "name":"Your Name", "user":1 }

### Middleware Global

```js
server.use((req, res, next) => {
  console.log("Requisição chamada");
  // manda para a requisição solicitada
  return next();
});
```

### Middleware function

```js
function middlewareName(req, res, next) {}
```

on route should be put the name of middleware function, for example:

```js
server.post("/example", middlewareName, (req, res) => {});
```
