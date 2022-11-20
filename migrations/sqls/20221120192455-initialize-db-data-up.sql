ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_details_id_seq RESTART WITH 1;



INSERT INTO users (firstname, lastname, email, password, role) VALUES ('mena', 'saleh' , 'mena@gmail.com', '$2b$10$nEfMiGToRkN9coB5lPs4.uldf.5HMS64MEvc9lZbGflwYgJ9ynl0a', 'admin');
INSERT INTO users (firstname, lastname, email, password, role) VALUES ('john', 'doe' , 'john@gmail.com', '$2b$10$nEfMiGToRkN9coB5lPs4.uldf.5HMS64MEvc9lZbGflwYgJ9ynl0a', 'user');
INSERT INTO users (firstname, lastname, email, password, role) VALUES ('maria', 'allen' , 'maria@gmail.com', '$2b$10$nEfMiGToRkN9coB5lPs4.uldf.5HMS64MEvc9lZbGflwYgJ9ynl0a', 'user');



INSERT INTO products (name, price) VALUES ('chips', 5);
INSERT INTO products (name, price) VALUES ('tuna', 20);
INSERT INTO products (name, price) VALUES ('chocolate', 25);
INSERT INTO products (name, price) VALUES ('cheese', 50);
INSERT INTO products (name, price) VALUES ('steak', 400);



INSERT INTO orders (user_id, status) VALUES (1, 'active');
INSERT INTO orders (user_id, status) VALUES (1, 'complete');
INSERT INTO orders (user_id, status) VALUES (2, 'active');
INSERT INTO orders (user_id, status) VALUES (3, 'active');


INSERT INTO orders_details (order_id, product_id, quantity) VALUES (1,1,2);
INSERT INTO orders_details (order_id, product_id, quantity) VALUES (1,2,4);
INSERT INTO orders_details (order_id, product_id, quantity) VALUES (1,5,1);
INSERT INTO orders_details (order_id, product_id, quantity) VALUES (2,1,4);
INSERT INTO orders_details (order_id, product_id, quantity) VALUES (2,3,2);
INSERT INTO orders_details (order_id, product_id, quantity) VALUES (3,4,2);
INSERT INTO orders_details (order_id, product_id, quantity) VALUES (3,2,4);
INSERT INTO orders_details (order_id, product_id, quantity) VALUES (4,5,2);