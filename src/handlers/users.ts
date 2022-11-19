import express, {Request, Response} from 'express'
import { UserStore, User } from '../models/users'
import jwt, { Secret } from 'jsonwebtoken'


const store = new UserStore();


//RESTful route handler (REST means it follows a specific architicture for an API (having routes as index, show, delete, update and create):
const create = async (req:Request, res:Response) => {

    const user: User = {
        firstname: req.query.username as unknown as string,
        lastname: req.query.lastname as unknown as string,
        role: 'user',
        email: req.query.email as unknown as string,
        password: req.query.password as unknown as string
    }
    try {
        const newUser = await store.create(user);
        //creating an object with jwt sign method, which takes an object to associate token info with, and a secret string to sign the token with
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as unknown as Secret);
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json(error as string + user)
    }

}

const authenticate = async (req: Request, res: Response) =>
{
    
    const username = req.query.username as unknown as string;
    const password = req.query.password as unknown as string;

    try {
        const Authenticated = await store.authenticate(username, password);
        //sending a token with the username as data in it.
        if(Authenticated != null)
        {
            const token = jwt.sign({username: username}, process.env.TOKEN_SECRET as unknown as Secret);
            res.json(token);
        }

    } catch (error) {
        res.status(400);
        res.json(error as string + username)
    }
}


//Function that takes an instance of express app and handles different route pathes according to handlers
const users_routes = (app: express.Application) => {


    app.post('/users',create)
    app.post('/users/authenticate', authenticate)
}



export default users_routes;