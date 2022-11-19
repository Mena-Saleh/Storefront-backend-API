CREATE TYPE order_status as ENUM ('active', 'complete');


ALTER TABLE orders ALTER COLUMN status TYPE order_status using status:: order_status;