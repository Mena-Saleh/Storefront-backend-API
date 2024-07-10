# STOREFRONT BACKEND API

## Table of Contents

1. Project Description 
2. Project Pre-Setup
3. Database Design and Schema
4. Usage, Endpoints, and Testing
5. Dependencies And About The Project
6. Copyrights And Acknowledgements

## Project Description 

This project presents a simple storefront backend API that features users, orders, and products with basic functionality for a storefront.

The project features many functionalities, including authentication and different types of authorization. Passwords are hashed using bcrypt for security. The database history is maintained through a series of migrations. Each DB entity has a model with respective methods representing the database table/entry. Every model method is mapped to a RESTful route in the handlers. Finally, there are model test cases and endpoints test cases covering the whole project using Jasmine and SuperTest.

## Project Pre-Setup

- Install required NodeJS packages listed in the package.json file (a list of required packages can also be found in section 4. Dependencies And About The Project).

- Create a system user in PGAdmin 4 for API usage:
    - Open PGAdmin 4.
    - Navigate to Login/Group Roles.
    - Create a super user with all privileges.
    - The username should be 'mena_store_admin' with the password '123456'.
    - Save the user.

- Initialize the database:
    - Open PG shell and connect to postgres using the created super user with port 5432.
    - Create the databases required for this project using the commands:
        ```sql
        create database mena_store;
        create database mena_store_test;
        ```
    - Run migrations using the command `db-migrate up` in CMD in the project root directory after installing db-migrate using NPM.
    - The DB is initialized with some initial data for testing; tests should be run before modifying any DB contents.

- Set up environmental variables:
    - Create a .ENV file in the root directory of the project.
    - Paste the following environment variables:
        ```env
        POSTGRES_HOST=127.0.0.1
        POSTGRES_DB=mena_store
        POSTGRES_TEST_DB=mena_store_test
        POSTGRES_USER=mena_store_admin
        POSTGRES_PASSWORD=123456
        ENV=dev
        BCRYPT_PASSWORD=my_password
        SALT_ROUNDS=10
        TOKEN_SECRET=my_secret
        ```

## Database Design and Schema

The database design and schema include three main entities: users, orders, and products. Below is an overview of the schema:

- Users
    - id (serial primary key)
    - first_name (VARCHAR)
    - last_name (VARCHAR)
    - password (VARCHAR)

- Orders
    - id (serial primary key)
    - user_id (INTEGER)
    - status (VARCHAR)

- Products
    - id (serial primary key)
    - name (VARCHAR)
    - price (NUMERIC)
    - category (VARCHAR)

- Order_Products (many-to-many relationship between orders and products)
    - id (serial primary key)
    - order_id (INTEGER)
    - product_id (INTEGER)
    - quantity (INTEGER)

## Usage, Endpoints, and Testing

- Usage:
    - The application can be started using `npm start` for the development version and `npm run build && npm startjs` for the production version.

- Endpoints:
    - Users:
        - index: "users" [GET] - token required
        - show: "users/:id" [GET] - token required
        - create: "users" [POST] (params: first_name, last_name, password) - no token required
        - authenticate: "users/authenticate" [POST] (params: first_name, last_name, password) - no token required
    - Products:
        - index: "products" [GET] - no token required
        - show: "products/:id" [GET] - no token required
        - create: "products" [POST] (params: name, price, category) - token required
    - Orders:
        - index: "orders" [GET] - token required
        - show: "orders/:id" [GET] - token required
        - create: "orders" [POST] (params: user_id, status) - token required
        - update: "orders/:id" [PATCH] (params: id, req_body: order_id, status) - owner token required
        - addProduct: "orders/:id/addProduct" [POST] (params: id, req_body: order_id, product_id, quantity) - owner token required

- Testing:
    - All test cases can be tested using Jasmine and SuperTest by running the simple script: `npm run test`.
    - Endpoints and model methods are tested.

## Dependencies And About The Project

This is a list of the dependencies and scripts that were used to power this NodeJS JavaScript web API.

- Scripts included in this project:
    - "build": "npx tsc",
    - "jasmine": "jasmine",
    - "test": "npm run build && npm run jasmine",
    - "lint": "eslint . --ext .ts",
    - "prettier": "prettier --config .prettierrc {,!(node_modules)/**/}*.ts --write",
    - "startjs": "npm run build && nodemon dist/.",
    - "start": "nodemon src/index.ts"

- To start the project, you can use the "start" script to test the dev version. To test the build version just run the script "startjs".
- The scripts test, prettier, and lint were used throughout the development process to test and maintain code readability and maintainability.

- Dependencies and modules used (type definitions were also added):
    - TypeScript
    - nodemon
    - SuperTest and Jasmine
    - express
    - prettier
    - eslint
    - pool
    - db-migrate
    - db-migrate-pg
    - cors
    - dotenv
    - jsonwebtoken
    - bcrypt
    - pg

## Copyrights And Acknowledgements

The source code for this project is done entirely by me, without any help from other parties. This code was written as a submission for the StoreFront backend API project for the Udacity Advanced Full Stack Developer Nanodegree program.

- About The Author
    - Name: Mena Ashraf Mikhael Saleh
    - Email: Mena.a.saleh.2001@gmail.com
    - GitHub: [https://github.com/Mena-Ibrahim](https://github.com/Mena-Ibrahim)
    - LinkedIn: [https://www.linkedin.com/in/mena-saleh-23b947167/](https://www.linkedin.com/in/mena-saleh-23b947167/)
