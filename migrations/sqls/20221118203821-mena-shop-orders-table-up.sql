create table orders(
    id serial primary key,
    status varchar(64),
    user_id bigint references users(id)
);

create table order_details(
    id serial primary key,
    quantity integer,
    user_id bigint references users(id),
    product_id bigint references products(id)
);