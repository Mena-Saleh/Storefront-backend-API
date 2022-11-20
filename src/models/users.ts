import client from '../database'
import bcrypt from 'bcrypt'
import 'process';


//TYPES

export type User ={

    id?: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    role: string;

}

//get pepper from env for hashing
const pepper: string = process.env.BCRYPT_PEPPER as unknown as string;


//Methods
export class UserStore
{
    //get all users
    async index(): Promise<User[]> {

        try {
         const conn =  await client.connect();
         const sql = 'SELECT * FROM users ORDER BY id';
         const result = await conn.query(sql);
         conn.release();
         return result.rows;
        } catch (error) {
         throw new Error(`Can't get users ${error}`);
        }
     }
 
     //get a specific user by id
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
 

     //create a new user
    async create(u: User): Promise<User>{
        
        try {
            const conn =  await client.connect();
            const sql = `insert into users (email, firstname, lastname , role, password) values ($1, $2, $3, $4, $5) RETURNING *`;

            //Password hashing:
            const hash: string = bcrypt.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS as string))
            const result = await conn.query(sql, [u.email ,u.firstname, u.lastname, u.role , hash]);
            conn.release();
            return result.rows[0];
           } catch (error) {
            throw new Error(`Can't create user ${error}`);
           }

    }

    //delete a user by id
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

    //update user by id and new user information.
    async update(id: string, u: User): Promise<User>{

        try
        {
            const conn = await client.connect();
            const sql = `UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4  WHERE ID = $5 RETURNING *`
            const hash: string = bcrypt.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS as string))
            const result = await conn.query(sql, [u.firstname, u.lastname, u.email, hash, id]);
            conn.release();       
            return result.rows[0];
            
        }
        catch(error)
        {
            throw new Error(`Can't update user ${error}`);
        }
    }


    //authenticate user email and password
    async authenticate(email: string, password: string): Promise<User|null>{
        try {
            const conn =  await client.connect(); 
            const sql = `select * from users where email = $1`; 

            const result = await conn.query(sql, [email]); 
            conn.release(); 
            
            if(result.rows.length != 0) 
            {
                const user = result.rows[0];
                if(bcrypt.compareSync(password + pepper, user.password))
                {
                    return user;
                }
            }
           } catch (error) {
            throw new Error(`Can't authenitcate user ${error}`);
           }
           return null;
    }


}