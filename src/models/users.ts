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
    role: string;

}


const pepper: string = process.env.BCRYPT_PEPPER as unknown as string;

export class UserStore
{
    
    async index(): Promise<User[]> {

        try {
         const conn =  await client.connect(); //open connection to db
         const sql = 'SELECT * FROM users'; //sql query
         const result = await conn.query(sql); //gets the result of the query which is either rows or error
         conn.release(); //close connection to db
         return result.rows;
        } catch (error) {
         throw new Error(`Can't get users ${error}`);
        }
     }
 
 
     async show(id: string): Promise<User>{
 
         try
         {
             const conn = await client.connect();
             const sql = `SELECT * FROM users WHERE id = $1`
             const result = await conn.query(sql, [id]);
             conn.release();
             return result.rows[0];
         }
         catch(error)
         {
             throw new Error(`Can't find user ${error}`);
         }
     }
 


    async create(u: User): Promise<User>{
        //users crated have a role of user by default (admin role can only be set from inside database)
        try {
            const conn =  await client.connect(); //open connection to db
            const sql = `insert into users (email, firstname, lastname , role, password) values ($1, $2, $3, $4) RETURNING *`; //sql query

            //Password hashing:
            const hash: string = bcrypt.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS as string))
            const result = await conn.query(sql, [u.email ,u.firstname, u.lastname, u.role , hash]); //gets the result of the query which is either rows or error
            conn.release(); //close connection to db
            return result.rows[0];
           } catch (error) {
            throw new Error(`Can't create user ${error}`);
           }

    }

    async delete(id: string): Promise<User> 
    { 
        try {
        const conn = await client.connect();
        const sql = 'DELETE FROM users WHERE id= $1 RETURNING *';
        const result = await conn.query(sql, [id])
        conn.release();
        return result.rows[0];
        }
        catch (error) {
        throw new Error(`Can't delete user ${error}`);
       }
    }


    async update(id: string, u: User): Promise<User>{

        try
        {
            const conn = await client.connect();
            const sql = `UPDATE products SET firstname = $1, lastname = $2, email = $3, password = $4  WHERE ID = $5 RETURNING *`
            const result = await conn.query(sql, [u.firstname, u.lastname, u.email, u.password, id]);
            conn.release();
            return result.rows[0];
        }
        catch(error)
        {
            throw new Error(`Can't update product ${error}`);
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