# RecipeExplorer
This is a RESTful API built for the Recipe Explorer application.


The entire application is contained within the src folder and is separated into three layers that interact with each other; controller, service, repository.

- The controller layer contains the endpoints for the API.
- The service layer contains the business logic.
- The repository layer contains the logic interacting with the database

## Installation
Clone the repo and use `npm install` to download the dependencies

## Run the app
`npm start` can be used to run the server locally which will run on a `PORT` set by the PORT variable in src/app.js.


## Technology
- NodeJS
- Express
- Multer
- JWT
- DynamoDB
- EC2
- S3


## REST API
All of the API's routes are described below

### User Routes
| Method      | Url                             | Description                                    | Authentication           |
| ----------- | ------------------------------- | ---------------------------------------------- | ------------------------ |
| `POST`      | `/api/users/login`              | Gets a JWT by username and password            |                          |
| `GET`       | `/api/users/register`           | Creates a user in the database                 |
| `GET`       | `/api/users/profile/:uuid`      | Gets all details about a user                  |
| `POST`      | `/api/users/profile`            | Updates a profile                              | JWT Bearer Token         |
| `PATCH`     | `/api/users/password`           | Updates a user's password                      | JWT Bearer Token         |
| `DELETE`    | `/api/users/:uuid`              | Deletes a user in the database                 | JWT Bearer Token
| `GET`       | `/api/users/recipes/:uuid`      | Gets a list of recipes by a user               |
| `GET`       | `/api/users/activity:uuid`      | Gets a list of comments and recipes by a user  |
| `GET`       | `/api/users/user-by-token`      | Gets a user's data by their token              | JWT Bearer Token |

### Recipe Routes
| Method      | Url                             | Description                                    | Authentication           |
| ----------- | ------------------------------- | ---------------------------------------------- | ------------------------ |
| `GET`      | `/api/recipes`               | Queries recipes based on query parameter of: cuisine, category, ingredient            |                          |
| `GET`      | `/api/recipes/:uuid`              | Gets a recipe by uuid            |                          |
| `POST`      | `/api/recipes`              | Creates a recipe in the database             | JWT Bearer Token                          |
| `PUT`      | `/api/recipes/:uuid`              | Edits a recipe in the database            |   JWT Bearer Token                       |
| `DELETE`      | `/api/recipes/:uuid`              | Deletes a recipe in the database            |      JWT Bearer Token           |


### Comment Routes 
| Method      | Url                             | Description                                    | Authentication           |
| ----------- | ------------------------------- | ---------------------------------------------- | ------------------------ |
|`POST`  | `/api/comments/`       | posts a comment                                     | JWT Bearer Token|
|`GET`   | `/api/comments/recipe` | gets all comments for a specific recipe             |                 |
|`PUT`   | `/api/comments/:uuid`  | updates the path specified comment with new values  | JWT Bearer Token| 
|`DELETE`| `/api/comments/:uuid`  | deletes the path specified comment from the database| JWT Bearer Token|
 
