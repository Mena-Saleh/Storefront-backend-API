import express, {Request, Response} from 'express'
import { UserStore, User } from '../models/users'
import jwt, { Secret } from 'jsonwebtoken'
import {verifyOwnIDToken , verifyAdminToken} from '../middleware/Authorization';



const store = new UserStore();


const index = async(req:Request, res:Response) : Promise<void> =>{

    try {
        const users = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

const show = async(req:Request, res:Response) : Promise<void> =>{

    const id: string = req.params.id;
    try {
        const user = await store.show(id);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


//RESTful route handler (REST means it follows a specific architicture for an API (having routes as index, show, delete, update and create):
const create = async (req:Request, res:Response) : Promise<void> => {

    //get user from request body:
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    }
    try {
        const newUser:User =  await store.create(user);
        //creating an object with jwt sign method, which takes an object to associate token info with, and a secret string to sign the token with
        const token : string = jwt.sign({id:newUser.id, username: newUser.firstname + ' ' + newUser.lastname, email: newUser.email, role: user.role}, process.env.TOKEN_SECRET as unknown as Secret);
        res.status(201);
        res.json(token);
    } catch (error) {
        // notify user of bad request
        res.status(400);
        res.json(error as string + user);
    }

}



const update = async (req: Request, res: Response) =>{
    const id: string = req.params.id;

    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    }

    try {
        const updatedUser = await store.update(id, user);
        res.json(updatedUser);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


const destroy = async (req: Request, res: Response) =>{
    const id: string = req.params.id;

    console.log("here");
    try {
        const deletedUser = await store.delete(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}



const authenticate = async (req: Request, res: Response) =>
{
    
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        const authenticated = await store.authenticate(email, password);
        //sending a token with the email as data in it.
        if(authenticated != null)
        {
            const token = jwt.sign({id: authenticated.id ,username: authenticated.firstname + ' ' + authenticated.lastname, email: authenticated.email, role: authenticated.role}, process.env.TOKEN_SECRET as unknown as Secret);
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


//Function that takes an instance of express app and handles different route pathes according to handlers
const users_routes = (app: express.Application) => {

    app.get('/users',verifyAdminToken , index); //show all users, requires admin token
    app.get('/users/:id', verifyAdminToken, show); //show a specific user, requires user token
    app.post('/users',create); //create a user (with role as 'user', the only way to create admin is through db) and returns user token
    app.post('/users/authenticate', authenticate); //authenticate user by email and password
    app.patch('/users/update/:id', verifyOwnIDToken,update) //update own account, requires token with id matching the one in params
    app.delete('/users/delete/:id', verifyOwnIDToken , destroy) //delete own account, requires token with id matching the one in params
}



export default users_routes;