import { QueryResult } from 'pg';
import client from '../database'


//TYPES

export type Order={

    id?: number;
    user_id: string;
    status: string;

}
export type OrderProduct ={

    id?: number;
    order_id: string;
    product_id: string;
    quantity: number;

}

export type OrderEntry = {
    product_name: string;
    product_price: number;
    product_quantity: number;
}

export type OrderPrice = {
    total_price: number;
}


//METHODS

export class OrderStore
{
    //get the total price of an order by order id
    async getOrderTotalPrice(id: string): Promise<OrderPrice> 
    {

        try {
            const conn =  await client.connect()
            const sql = `SELECT SUM(products.price * orders_details.quantity) as "total_price"
            FROM orders INNER JOIN orders_details INNER JOIN products 
            ON  orders_details.product_id = products.id
            ON  orders.id = orders_details.order_id
            WHERE orders.id = $1`; //sql query
            const result = await conn.query(sql, [id]); 
            conn.release();
            return result.rows[0];
           } catch (error) {
            throw new Error(`Can't get products ${error}`);
           }

    }

    //get the list of items in an order by order id (whether active or not)
    async getOrderProducts(id: string): Promise<OrderEntry[]> 
    {

        try {
            const conn =  await client.connect();
            const sql = `SELECT products.name, products.price, orders_details.quantity
            FROM orders INNER JOIN orders_details INNER JOIN products 
            ON  orders_details.product_id = products.id
            ON  orders.id = orders_details.order_id
            WHERE orders.id = $1`; //sql query
            const result : QueryResult<OrderEntry> = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
           } catch (error) {
            throw new Error(`Can't get products ${error}`);
           }

    }

    //get all orders (active or complete)
    async getOrders(user_id: string, status: string): Promise<Order[]> {

        try {
         const conn =  await client.connect();
         const sql = `SELECT * FROM orders where status = $1 and user_id = $2`; 
         const result = await conn.query(sql, [status, user_id]);
         conn.release();
         return result.rows;
        } catch (error) {
         throw new Error(`Can't get orders ${error}`);
        }
     }


    //adds a product to as specific order
    async addProduct(op: OrderProduct): Promise<OrderProduct>{
        try {
            const conn =  await client.connect();
            const sqlOrder = `SELECT * FROM orders WHERE id = $1`;
            const resultOrder = await conn.query(sqlOrder, [op.order_id]);
            const order = resultOrder.rows[0];
            if (order.status == 'complete')
            {
                throw new Error(`can not insert product in a completed order.`);
            }

            const sqlAddProduct = `INSERT INTO orders_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`
            const resultAddProduct = await conn.query(sqlAddProduct, [op.order_id, op.product_id, op.quantity]);
            conn.release();
            return resultAddProduct.rows[0];
           } catch (error) {
            throw new Error(`Can't add product to order ${error}`);
           }

    }


    //create order
    async create(o: Order): Promise<Order>{
        try {
            const conn =  await client.connect();
            const sql = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`;
            const result = await conn.query(sql, [o.user_id, o.status]);
            conn.release();
            return result.rows[0];
           } catch (error) {
            throw new Error(`Can't add product ${error}`);
           }

    }

    //delete order by id
    async delete(id: string): Promise<Order> 
    { 
        try {
        const conn = await client.connect();
        const sql = 'DELETE FROM orders WHERE id= $1 RETURNING *';
        const result = await conn.query(sql, [id])
        conn.release();
        return result.rows[0];
        }
        catch (error) {
        throw new Error(`Can't delete product ${error}`);
       }
    }

    //set status of order, takes id and new status (should be active or complete to match enum type in db)
    async setStatus(id: string, status: string): Promise<Order>{

        try
        {
            const conn = await client.connect();
            const sql = `UPDATE orders SET status = $1 WHERE ID = $2 RETURNING *`
            const result = await conn.query(sql, [status , id]);
            conn.release();
            return result.rows[0];
        }
        catch(error)
        {
            throw new Error(`Can't update product ${error}`);
        }
    }

}