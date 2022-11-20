DROP TYPE user_role;


ALTER TABLE users ALTER COLUMN role TYPE varchar(20) using role:: varchar(20);