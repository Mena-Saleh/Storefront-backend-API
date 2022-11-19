DROP TYPE order_status;


ALTER TABLE orders ALTER COLUMN status TYPE varchar(64) using status:: varchar(64);