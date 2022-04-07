# Connection to MongoDB Database using Express

## Index.js

It makes the connection with mongoose, and defines the port on which the requests will be listened (:2000).

## .env

Definition of the url where mongoDB is located, and the port of express (:2000, used in the index.js file)

## Controller

Receives the request and checks that the requirements for the request are met.

## Datalayer

Receives certain parameters and completes a database call, returning the result.

## Model

The definition of the model.

## Node modules

- express
- dotenv
- mongoose
- express-validator
- jsonwebtoken

## Node modules

- express
- dotenv
- mongoose
- express-validator
- jsonwebtoken
