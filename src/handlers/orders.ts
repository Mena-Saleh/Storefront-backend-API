import express, {Request, Response} from 'express'
import { OrderStore, Order, OrderEntry, OrderPrice , OrderProduct } from '../models/orders'
import {verifyOwnIDToken} from '../middleware/Authorization';



const store = new OrderStore();

//get all orders for a user, takes user id as params and status of orders to show in the body
const getOrders = async(req:Request, res:Response) : Promise<void> =>{
    const user_id: string = req.params.id;
    const status: string = req.body.status;
    try {
        const orders : Order[] = await store.getOrders(user_id, status);
        res.status(302)
        res.json(orders);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

//create a new order, takes only user id from params and sets that status to active because it is a new order
const create = async (req:Request, res:Response) : Promise<void> => {

    const order: Order = {
        user_id: req.params.id,
        status: 'active' 
    }
    try {
        const newOrder: Order = await store.create(order);
        res.status(201);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }

}


//delete an order by order_id
const destroy = async (req: Request, res: Response): Promise<void> =>{
    const order_id: string = req.body.order_id;
    const user_id: string = req.params.id;

    try {
        const deletedOrder: Order = await store.delete(order_id, user_id);
        res.status(200);
        res.json(deletedOrder);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

//set status of an order by order_id
const setStatus = async (req: Request, res: Response): Promise<void> =>{
    const order_id: string = req.body.order_id;
    const status: string = req.body.status;
    const user_id: string = req.params.id;

    try {
        const updatedOrder: Order = await store.setStatus(order_id, user_id , status);
        res.status(200);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}

// add product to an order, takes order_id, product_id, and quantity from the body (orderProduct)
const addProduct = async (req: Request, res: Response): Promise<void> =>{
    const orderProduct: OrderProduct = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    const user_id: string = req.params.id;
    try {
        const addedProduct : OrderProduct = await store.addProduct(user_id, orderProduct);
        res.status(201);
        res.json(addedProduct);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


//get total price for an order, takes order_id from the body
const getOrderTotalPrice = async (req: Request, res: Response): Promise<void> =>{
    const order_id: string = req.body.order_id;
    const user_id: string = req.params.id;

    try {
        const orderPrice : OrderPrice = await store.getOrderTotalPrice(order_id, user_id);
        res.status(302);
        res.json(orderPrice);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}


//get a list of products that are in an order
const getOrderProducts = async (req: Request, res: Response): Promise<void> =>{
    const order_id: string = req.body.order_id;
    const user_id: string = req.params.id;

    try {
        const orderProducts : OrderEntry[] = await store.getOrderProducts(order_id, user_id);
        res.status(302)
        res.json(orderProducts);
    } catch (error) {
        res.status(400);
        res.json(error as string);
    }
}





//RESTful API routes for orders management
const orders_routes = (app: express.Application) : void => {
    
    //the id passed through params is user_id not order_id, order_is passed in the body.
    //the user_id is used in the middleware (verifyOwnIDToken) to authorize users to manage their own data only, 
    //user_id is also used in the model queries, so data integrity is maintained.


    app.get("/orders/:id", verifyOwnIDToken, getOrders); //get all orders for a user
    app.get("/orders/:id/totalPrice", verifyOwnIDToken, getOrderTotalPrice); //get total price of specific order for a user
    app.get("/orders/:id/products", verifyOwnIDToken, getOrderProducts); //get list of products in a specific order for a user

    app.post("/orders/:id/addProduct", verifyOwnIDToken, addProduct); //add a new product in a specific order for a user
    app.post("/orders/:id", verifyOwnIDToken, create); //create a new order for a user

    app.patch("/orders/:id/setStatus", verifyOwnIDToken, setStatus); //update order status for a user
    app.delete("/orders/:id", verifyOwnIDToken ,destroy); //delete an order for a user
}



export default orders_routes;