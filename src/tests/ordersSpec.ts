import supertest from 'supertest';
import app from '../server';
import {OrderStore, Order, OrderProduct} from '../models/orders' //import the model


const orders = new OrderStore(); //Create an object of my model
const req = supertest(app);


describe('orders model testing', () =>
{
    it('should have a create method', () => {
        expect(orders.create).toBeDefined(); 
    });

    it('create should make new order and return it', async () => {

        const createTestOrder: Order = {
            user_id: '1',
            status: 'active'
        }
        const result = await orders.create(createTestOrder);
        expect(result.status).toEqual('active');
    });

    it('should have delete method', () => {
        expect(orders.delete).toBeDefined(); 
    });

    it('delete deletes an order and returns it', async () => {
        const result = await orders.delete('3','2');
        expect (result).toBeTruthy;
    });


    it('should have setStatus method', () => {
        expect(orders.setStatus).toBeDefined(); 
    });

    it('setStatus should change order status and return new order', async () => {

     
        const result = await orders.setStatus('3','2','complete');
        expect (result.status).toEqual('complete');
    });

    it('should have addProduct method', () => {
        expect(orders.addProduct).toBeDefined(); 
    });

    it('addProduct should add product returning orderProduct', async () => {
        const testAddOrderProduct : OrderProduct = {
            order_id: '1',
            product_id: '2',
            quantity: 3
        }
        const result = await orders.addProduct('1',testAddOrderProduct );
        expect (result.quantity).toEqual(3);
    });


    it('should have getOrders method', () => {
        expect(orders.getOrders).toBeDefined(); 
    });

    it('getOrders gets orders of a user of a specific status', async () => {

        const results = await orders.getOrders('1', 'active');
        expect (results[0].status).toEqual('active');
    });

    it('should have getOrderProducts method', () => {
        expect(orders.getOrderProducts).toBeDefined(); 
    });

    it('getOrderProducts gets list of items in an order', async () => {

        const results = await orders.getOrderProducts('1', '1');
        expect (results.length).toEqual(4);
    });

    
    it('should have getOrderTotalPrice method', () => {
        expect(orders.getOrderTotalPrice).toBeDefined(); 
    });

    it('getOrderTotalPrice gets total price of an order', async () => {

        const result = await orders.getOrderTotalPrice('1', '1');
        expect (result.total_price).toEqual('550');
    });
});




describe('endpoints testing for orders handlers', () => {

 it('get orders shows all user orders (active or complete can be specified)', async () => {
    const res = await req.get('/orders/1').send({status: 'active'}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE');
    expect (res.status).toBe(302);
 });
    
 it('get orders requires own user authorization)', async () => {
    const res = await req.get('/orders/1').send({status: 'active'}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo');
    expect (res.status).toBe(401);
 });

 it('create creates a new order for the authorized user)', async () => {
    const res = await req.post('/orders/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE');
    expect (res.status).toBe(201);
 });
    
 it('create requires own user authorization)', async () => {
    const res = await req.post('/orders/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo');  expect (res.status).toBe(401);
 });

 it('delete deletes order by id)', async () => {
    const res = await req.delete('/orders/1').send({order_id: '5'}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE');
    expect (res.status).toBe(200)
 });

 it('set status changes status of order by order id for the authorized user', async () => {
    const res = await req.patch('/orders/1/setStatus').send({order_id: 1 , status: 'active'}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE');
    expect (res.status).toBe(200);
 });

 it('set status requires id and token of order owner', async () => {
    const res = await req.patch('/orders/1/setStatus').send({order_id: 1 ,status: 'active'}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo');
    expect (res.status).toBe(401);
 });

 it('add product adds product to order by order id for the authorized user', async () => {
    const res = await req.post('/orders/1/addProduct').send({order_id: 1 ,product_id: 3, quantity: 4}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE');
    expect (res.status).toBe(201);
 });

 it('add product requires id and token of order owner', async () => {
    const res = await req.post('/orders/1/addProduct').send({order_id: 1 ,product_id: 3, quantity: 4}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo');
    expect (res.status).toBe(401);
 });

 it('get total prices gets the order total price by order id for the authorized user', async () => {
    const res = await req.get('/orders/1/totalPrice').send({order_id: 1}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE');
    expect (res.status).toBe(302);
 });

 it('get total prices requires authorization of order owner', async () => {
    const res = await req.get('/orders/1/totalPrice').send({order_id: 1})
    expect (res.status).toBe(401);
 });


 it('get order products gets a list of products in an order by order id for the authorized user', async () => {
    const res = await req.get('/orders/1/products').send({order_id: 1}).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE');
    expect (res.status).toBe(302);
 });

 it('get order products requires authorization of order owner', async () => {
    const res = await req.get('/orders/1/products').send({order_id: 1})
    expect (res.status).toBe(401);
 });


});