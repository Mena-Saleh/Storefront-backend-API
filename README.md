# STOREFRONT BACKEND API

## Table of Contents

1. Project Description 
2. Project Pre-Setup
3. Database design and schema
3. Usage, Endpoints and Testing
4. Dependencies And About The Project
5. Copyrights And Acknowledgements

## Project Description 

This project presents a simple storefront backend API that features users, orders and products and basic functionality on those entities for a storefront.

The project features many funtionalities, for instance there is authentication and different types of authorization, passwords are hashed using bcrypt for security. The database history is maintained through a series of migrations, each db entity has model with respective method represnting the database table/entry, every model method is mapped to a RESTful route in the handlers. Finally there are model test cases and endpoints test cases covering the whole project using jasmine and supertest.


## Project Pre-Setup

- Install required NodeJS packages listed in the package.json file (a list of required packages can also be found in section 4. Dependencies And About The Project)

- Create system user in PGAdmin 4 for API usage:

    - Open PGAdmin 4.
    - Navigate to Login/Group Roles.
    - Create a super user with all priviliges.
    - The user name should be 'mena_store_admin' with password '123456'
    - Save the user


- Initialize database:

    - Open PG shell and connect to postgres using the created super user with port 5432.
    - Create the databases required for this project using the commands:

        create database mena_store;
        create database mena_store_test;

    - Run migrations using the command: db-migrate up in CMD in the project root directory after installing db-migrate using NPM
    - The db is initialized with some initial data for testing, tests should be run before modifying any db contents.

- Set up environmental variables

    - Create a .ENV file in the root directory of the project.
    - Paste the following environment variables in the file:

        POSTGRES_HOST = 127.0.0.1
        POSTGRES_DB = mena_store
        POSTGRES_USER = mena_store_admin
        POSTGRES_PASSWORD = 123456
        POSTGRES_TEST_DB = mena_store_test
        ENV = test
        BCRYPT_PEPPER = DJSADDJ*!*!CMKcjjs76662$@%^!*896986ffva!*2818291
        SALT_ROUNDS = 10
        TOKEN_SECRET = 3SDOJ193JKZXC@31OJSD9&*%kdmc87891278JKXCK&^*^*&*^*$&&$*!@@!*!*&%*!*&&NCSNI9898DDS


- The API runs on port 3000, for details on usage check section 3. Usage, Endpoints and Testing.


## Database Desgin and Schema

- Users table

                                     Table "public.users"
  Column   |          Type          | Collation | Nullable |              Default
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 email     | character varying(300) |           | not null |
 firstname | character varying(100) |           | not null |
 lastname  | character varying(100) |           | not null |
 password  | character varying(300) |           | not null |
 role      | user_role              |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)


- Products table

                                    Table "public.products"
 Column |          Type          | Collation | Nullable |               Default
--------+------------------------+-----------+----------+--------------------------------------
 id     | integer                |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(100) |           | not null |
 price  | integer                |           | not null |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders_details" CONSTRAINT "orders_details_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)


- Orders table

                               Table "public.orders"
 Column  |     Type     | Collation | Nullable |              Default
---------+--------------+-----------+----------+------------------------------------
 id      | integer      |           | not null | nextval('orders_id_seq'::regclass)
 user_id | bigint       |           | not null |
 status  | order_status |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "orders_details" CONSTRAINT "orders_details_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

- Orders_details table

                              Table "public.orders_details"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('orders_details_id_seq'::regclass)
 order_id   | bigint  |           | not null |
 product_id | bigint  |           | not null |
 quantity   | integer |           | not null |
Indexes:
    "orders_details_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_details_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "orders_details_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

## Usage

- Intro

    - Use the script: NPM run start to run this API.
    - The port for this API is set to 3000 inittially, to access the home page, go to the route localhost:3000


- API Endpoints structure
- There are three main routes, one for each model (entity)

    - Products
        - Index:    "/products"             [GET]
        - Show:     "/products/:id"         [GET]       (params: id)
        - Create:   "/products"             [POST]      (req_body: name, price)                 -admin token required
        - delete    "/products/:id"         [DELETE]    (params: id)                            -admin token required
        - update    "/products/:id"         [PATCH]     (params: id - req_body: name, price)    -admin token required


    - Users
        - Index:    "/users"                [GET]                                               -admin token required
        - Show:     "/users/:id"            [GET]       (params: id)                            -admin token required
        - delete    "/users/:id"            [DELETE]    (params: id)                            -owner token required
        - update    "/users/:id"            [PATCH]     (params: id - req_body: firstname, lastname, email , password) -downer token required
        - Create    "/users"                [POST]      (req_body: firstname, lastname, email , password)              -returns new user token
        - Login     "/users/authenticate"   [POST]      (req_body: email, password)                                    -returns user token



    
    - Orders
    - (id passed in params is user_id not order_id, it is often used for authorization in these endpoints)

        - getOrders:   "orders/:id"            [GET]       (params: id, req_body: status)          -owner token required
        - orderPrice:  "orders/:id/totalPrice" [GET]       (params: id, req_body: order_id)        -owner token required
        - orderItems:  "orders/:id/products"   [GET]       (params: id, req_body: order_id)        -owner token required
        - CreateOrder: "orders/:id"            [POST]      (params: id)                            -owner token required
        - deleteOrder: "orders/:id"            [DELETE]    (params: id, req_body: order_id)        -owner token required
        - setStatus:   "orders/:id/setstatus"  [PATCH]     (params: id, req_body: order_id, status)                 -owner token required
        - addProduct:  "orders/:id/addProduct" [POST]      (params: id, req_body: order_id, product_id, quantity)   -owner token required



- Testing

    - all test cases can be tested using jasmine and supertest by running the simple script: "npm run test"
    - endpoints and model methods are tested.

## Dependencies And About The Project

This is a list of the dependencies and scripts that were used to power this nodeJS javascript web API.


- Scripts included in this project:
    - "build": "npx tsc",
    - "jasmine": "jasmine",
    - "test": "npm run build && npm run jasmine",
    - "lint": "eslint . --ext .ts",
    - "prettier": "prettier --config .prettierrc {,!(node_modules)/**/}*.ts --write",
    - "startjs": "npm run build && nodemon dist/.",
    - "start": "nodemon src/index.ts"

- To start the project, you can use the "start" script to test the dev version. To test the build version just run the script "startjs"
- The scripts test, prettier and lint were used throughout the development process to test and maintain code readability and maintainability.


- Dependencies and modules used (type definitions were also added):
    
    - typeScript
    - nodemon
    - superTest and Jasmine
    - express
    - prettier
    - lint
    - pool
    - db-migrate
    - db-migate-pg
    - cors
    - dotenv
    - jsonwebtoken
    - bcrypt
    - pg



## Copyrights And Acknowledgements

    The source code for this project is done entirely by me, without any help of other parties. 
    This code was written as a submission for the StoreFront backend API project for the 
    Udacity Advanced full stack developer nanodegree program.

    - About The Author
        - Name: Mena Ashraf Mikhael Saleh
        - Email: Mena.a.saleh.2001@gmail.com
        - GitHub: https://github.com/Mena-Ibrahim
        - LinkedIn: https://www.linkedin.com/in/mena-saleh-23b947167/


