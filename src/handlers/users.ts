import express, {Request, Response} from 'express'
import { UserStore, User } from '../models/users'
import jwt, { Secret } from 'jsonwebtoken'
import {verifyOwnIDToken , verifyAdminToken} from '../middleware/Authorization';



const store = new UserStore();


//get all users
const index = async(req:Request, res:Response) : Promise<void> =>{

    try {
        const users: User[] = await store.index();
        res.status(302) //found
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

//get a specific user by id
const show = async(req:Request, res:Response) : Promise<void> =>{

    const id: string = req.params.id;
    try {
        const user: User = await store.show(id);
        res.status(302);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


//create a new user
const create = async (req:Request, res:Response) : Promise<void> => {

    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'user' //role is user by default and can only be changed to admin from db
    }
    try {
        const newUser:User =  await store.create(user);
        //signing token for the new user, the token has the user information in the payload
        const token : string = jwt.sign({id:newUser.id, username: newUser.firstname + ' ' + newUser.lastname, email: newUser.email, role: user.role}, process.env.TOKEN_SECRET as unknown as Secret);
        res.status(201);
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json(error as string + user);
    }

}


//update a user by id and new user information
const update = async (req: Request, res: Response) : Promise<void> =>{
    const id: string = req.params.id;

    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'user' //role can't be changed from here, has to be from db
    }

    try {
        const updatedUser: User = await store.update(id, user);
        res.status(200);
        res.json(updatedUser);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


//delete a user by id
const destroy = async (req: Request, res: Response) : Promise<void>=>{
    const id: string = req.params.id;

    try {
        const deletedUser:User = await store.delete(id);
        res.status(200);
        res.json(deletedUser);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


//authenticate user by email and password
const authenticate = async (req: Request, res: Response) : Promise<void> =>
{
    
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        const authenticated = await store.authenticate(email, password);

        if(authenticated != null)// user exists
        {
            //sign new token for the user
            const token: string = jwt.sign({id: authenticated.id ,username: authenticated.firstname + ' ' + authenticated.lastname, email: authenticated.email, role: authenticated.role}, process.env.TOKEN_SECRET as unknown as Secret);
            res.status(302);
            res.json(token);
        }
        else
        {
            res.status(404);
            res.send("Incorrect email or password");
        }

    } catch (error) {
        res.status(400);
        res.json(error as string + email);
    }

}


//RESTful routes for users management
const users_routes = (app: express.Application) => {
    
    //show and index require admin privellege, because only adming can see user details.
    app.get('/users',verifyAdminToken , index); //get all users
    app.get('/users/:id', verifyAdminToken, show); //get a specific user

    app.post('/users',create); //create a new user
    app.post('/users/authenticate', authenticate); //authenticate user by email and password

    //update and delete require the id in params to be the same one to be updated/deleted, because users can only manage their own data.
    app.patch('/users/:id', verifyOwnIDToken, update) //update account by id and new account information
    app.delete('/users/:id', verifyOwnIDToken , destroy) //delete account by id
}



export default users_routes;