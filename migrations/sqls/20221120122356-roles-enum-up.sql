CREATE TYPE user_role as ENUM ('user', 'admin');


ALTER TABLE users ALTER COLUMN role TYPE user_role using role:: user_role;