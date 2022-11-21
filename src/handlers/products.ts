import express, {Request, Response} from 'express'
import { ProductStore, Product } from '../models/products'
import {verifyAdminToken} from '../middleware/Authorization';

const store = new ProductStore();


// get all products
const index = async(req:Request, res:Response) : Promise<void> =>{

    try {
        const products: Product[] = await store.index();
        res.status(302);
        res.json(products);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

//get specific product by id
const show = async(req:Request, res:Response) : Promise<void> =>{

    const id: string = req.params.id;
    try {
        const product: Product = await store.show(id);
        res.status(302);
        res.json(product);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

//create new product, takes name and price from body
const create = async (req:Request, res:Response) : Promise<void> => {

    const product: Product = {
        name: req.body.name as unknown as string,
        price: req.body.price as unknown as number
    }

    try {
        const newProduct: Product = await store.create(product);
        res.status(201);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
  
}

//update a product by id, takes new product details (name, price) from body
const update = async (req: Request, res: Response) : Promise<void> =>{
    const id: string = req.params.id;

    const product: Product = {
        name: req.body.name,
        price: req.body.price
    }

    try {
        const updatedProduct: Product = await store.update(id, product);
        res.status(200);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

//delete a product by id
const destroy = async (req: Request, res: Response) : Promise<void> =>{
    const id: string = req.params.id;

    try {
        const deletedProduct: Product = await store.delete(id);
        res.status(200);
        res.json(deletedProduct);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


//RESTful routes for products management
const products_routes = (app: express.Application) => {

    app.get('/products', index) //get all products
    app.get('/products/:id', show) //get a speicifc product by id

    //only admin can manage products, therefore a token with a user role as admin is required:
    app.post('/products', verifyAdminToken ,create)  //create new product 
    app.patch('/products/:id', verifyAdminToken, update) //update a product
    app.delete('/products/:id', verifyAdminToken ,destroy) //delete a product


}



export default products_routes;