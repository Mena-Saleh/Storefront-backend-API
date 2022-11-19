# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required] -admin only
- delete [token required] -admin only
- update [token required] -admin only
- [OPTIONAL] Top 5 most popular products 


#### Users
- Index [token required] -admin only
- Show [token required] - admin only
- [OPTIONAL] delete [token required] - admin only
- [OPTIONAL] update[token required] - admin only
- Create (returns token) -any user
- Login (returns token) -any user



#### Orders
- Make a new order(args: user id) [token required] -creates order for logged in user with status 'ongoing'
- delete order (args: order id)  [token required]
- Change order status(args: order id) [token required] -change ongoing to completed and vice versa
- Add product to an order (args: order id, product name)
- Remove product from an order (args: order id, product name)

- Current Orders by user (args: user id)[token required] (status is active) (display order products too with their name)
- [OPTIONAL] Completed Orders by user (args: user id)[token required] (status is completed) (display order products too with their name)


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

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

