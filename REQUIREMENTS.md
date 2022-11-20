# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products
- Index:    "/products"             [GET]
- Show:     "/products/:id"         [GET]       (params: id)
- Create:   "/products"             [POST]      (req_body: name, price)                 -admin token required
- delete    "/products/:id"         [DELETE]    (params: id)                            -admin token required
- update    "/products/:id"         [PATCH]     (params: id - req_body: name, price)    -admin token required


#### Users
- Index:    "/users"                [GET]                                               -admin token required
- Show:     "/users/:id"            [GET]       (params: id)                            -admin token required
- delete    "/users/:id"            [DELETE]    (params: id)                            -owner token required
- update    "/users/:id"            [PATCH]     (params: id - req_body: firstname, lastname, email , password) -downer token required
- Create    "/users"                [POST]      (req_body: firstname, lastname, email , password)              -returns new user token
- Login     "/users/authenticate"   [POST]      (req_body: email, password)                                    -returns user token



#### Orders

- id passed in params is user_id not order_id, it is often used for authorization in these endpoints:

- getOrders:   "orders/:id"            [GET]       (params: id, req_body: status)          -owner token required
- orderPrice:  "orders/:id/totalPrice" [GET]       (params: id, req_body: order_id)        -owner token required
- orderItems:  "orders/:id/products"   [GET]       (params: id, req_body: order_id)        -owner token required
- CreateOrder: "orders/:id"            [POST]      (params: id)                            -owner token required
- deleteOrder: "orders/:id"            [DELETE]    (params: id, req_body: order_id)        -owner token required
- setStatus:   "orders/:id/setstatus"  [PATCH]     (params: id, req_body: order_id, status)                 -owner token required
- addProduct:  "orders/:id/addProduct" [POST]      (params: id, req_body: order_id, product_id, quantity)   -owner token required



## Data Shapes

#### Product
- id
- name
- price

#### User
- id
- email
- firstName
- lastName
- password
- role

#### Orders
- id
- user_id
- quantity of each product in the order
- user_id
- status of order (active or complete)

