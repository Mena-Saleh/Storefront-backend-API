import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()


//get environment variables
const POSTGRES_HOST : string|undefined = process.env.POSTGRES_HOST 
const POSTGRES_USER : string|undefined = process.env.POSTGRES_USER
const POSTGRES_PASSWORD : string|undefined = process.env.POSTGRES_PASSWORD
const POSTGRES_TEST_DB : string|undefined = process.env.POSTGRES_TEST_DB 
const ENV :string|undefined = process.env.ENV;
const POSTGRES_DB : string|undefined = process.env.POSTGRES_DB




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
  }
  )
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
