# Mongoose Connections

## Node.js/Express app to perform CRUD operations using mongoose

### Purpose
The main objective of this project is to allow users to provide their information through the signup or login page and then register or log in to their respective accounts. To achieve this, passport, passport-local, and passport-local-mongoose npm packages are utilized. These packages facilitate user registration and authentication processes. The user data is stored in a MongoDB database, which is hosted on MongoDB Atlas.

### Following POST Requests can be sent to the app
* /login
* /signup
* /logout

### Middlewares
* connectToDB
* registerUser
* authenticateAndLogin
