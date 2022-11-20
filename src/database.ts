import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()


//get environment variables
const {
    POSTGRES_HOST ,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
} =  process.env;




//pool to manage database connection
let client:Pool;

console.log(ENV)

//configure db connection depending on ENV value
if(ENV == 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

export default client;
