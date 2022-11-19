import express, {Request, Response} from 'express'
import { ProductStore, Product } from '../models/products'
import verifyAuthToken from '../utilities/verifyAuthToken';

const store = new ProductStore();


//RESTful route handler (REST means it follows a specific architicture for an API (having routes as index, show, delete, update and create):
const index = async (req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}


const show = async (req: Request, res: Response) =>
{
    const product = await store.show(req.query.id as unknown as string)
    res.json(product);
}

const del = async (req: Request, res: Response) =>{
    const deleted = await store.delete(req.query.id as unknown as string)
    res.json(deleted);
}

const create = async (req:Request, res:Response) => {

    const toCreate: Product = {
        name: req.query.name as unknown as string,
        price: req.query.price as unknown as number
    }


    //Better to do this as a middleware:
    //Authorization: to check if the user is authorized to do an action, here I am checking if the user has a valid token (logged in) before allowing them to create a new product
    // try {
    //     //token is passed from request header not url query params or req.body because it is more secure this way, also secret key has to be passed to check the authenticity of the token
    //     const authorizationHeader = req.headers.authorization
    //     const token = (authorizationHeader as unknown as string).split(' ')[1]
    //     jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
    // } catch (error) {
    //     //token is wrong, return an error and stop function execution by returning
    //     res.status(401);
    //     res.json(`invalid token ${error}`);
    //     return; 
    // }

    try {
        const created = await store.create(toCreate);
        res.json(created);
    } catch (error) {
        res.send(error);
    }
  
}


//Function that takes an instance of express app and handles different route pathes according to handlers
const products_routes = (app: express.Application) => {

    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken,create) //verification with jwt as a middleware
    app.delete('/products', del)


}



export default products_routes;