import client from '../database'
import bcrypt from 'bcrypt'
import 'process';

//User data type
export type User ={

    id?: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;

}


const pepper: string = process.env.BCRYPT_PEPPER as unknown as string;

export class UserStore
{
    //index method to read all products and return a promise of product array
    async create(u: User): Promise<User>{

        try {
            const conn =  await client.connect(); //open connection to db
            const sql = `insert into users (email, firstname, lastname , password) values ($1, $2, $3, $4) RETURNING *`; //sql query

            //Password hashing:
            const hash: string = bcrypt.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS as string))
            const result = await conn.query(sql, [u.email ,u.firstname, u.lastname, hash]); //gets the result of the query which is either rows or error
            conn.release(); //close connection to db
            return result.rows[0];
           } catch (error) {
            throw new Error(`Can't create user ${error}`);
           }

    }


    async authenticate(email: string, password: string): Promise<User|null>{
        try {
            const conn =  await client.connect(); //open connection to db
            const sql = `select * from users where username = $1`; //sql query

            const result = await conn.query(sql, [email]); //gets the result of the query which is either rows or error
            conn.release(); //close connection to db
            
            if(result.rows.length) //user exists
            {
                const user = result.rows[0];
                if(bcrypt.compareSync(password + pepper, user.password)) //comparing entered password with hashed one
                {
                    return user;
                }
            }
           } catch (error) {
            throw new Error(`Can't add product ${error}`);
           }
           return null;
    }





    
}