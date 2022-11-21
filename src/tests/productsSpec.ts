import {ProductStore, Product} from '../models/products' 
import supertest from 'supertest';
import app from '../server';

const products = new ProductStore(); 
const req = supertest(app);




describe('products model testing', () =>
{
    it('should have index method', () => {
        expect(products.index).toBeDefined(); 
    });

    it('index should return a list of products', async () => {
        const results = await products.index();
        expect(results.length).toEqual(5);
        expect(results[0].price).toEqual(5);
        expect(results[4].name).toEqual('steak');
    });

    it('should have show method', () => {
        expect(products.show).toBeDefined(); 
    });

    it('show should return a product by id', async () => {
        const result = await products.show('3');
        expect (result.name).toEqual('chocolate');
    });


    it('should have create method', () => {
        expect(products.create).toBeDefined(); 
    });

    it('create should create new product and return it', async () => {

        const createTestProduct: Product = {
            name: "mango",
            price: 12
        }
        const result = await products.create(createTestProduct);
        expect (result.name).toEqual('mango');
    });
    it('should have delete method', () => {
        expect(products.delete).toBeDefined(); 
    });

    it('delete should delete product and return it', async () => {

        const result = await products.delete('6');
        expect (result.name).toEqual('mango');
    });


    it('should have update method', () => {
        expect(products.update).toBeDefined(); 
    });

    it('update should update product and return new information', async () => {

        const updateTestProduct: Product = {
            name: "steak",
            price: 300
        }

        const result = await products.update('5', updateTestProduct);
        expect (result.price).toEqual(300);
    });
});




describe('endpoints testing for products handlers', () => {
    it('index shows all products', async () => {
        const res = await req.get('/products')
        expect(res.status).toBe(302)
    });

    it('index shows a specific product', async () => {
        const res = await req.get('/products/2')
        expect(res.status).toBe(302)
    });

    it('create creates a new product by admin', async () => {
        const res = await req.post('/products').send({
            name: "lasagna",
            price: 55
        }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')
        expect(res.status).toBe(201)
    });

    it('create requires admin token', async () => {
        const res = await req.post('/products').send({
            name: "lasagna",
            price: 55
        })
        expect(res.status).toBe(401)
    });

    it('update updates an existing product by admin', async () => {
        const res = await req.patch('/products/6').send({
            name: "lasagna",
            price: 88
        }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')
        expect(res.status).toBe(200)
    });

    it('update requires admin token', async () => {
        const res = await req.post('/products').send({
            name: "lasagna",
            price: 90
        })
        expect(res.status).toBe(401)
    });

    it('delete deletes specific product by admin', async () => {
        const res = await req.delete('/products/6').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')

        expect(res.status).toBe(200)
    });

    it('delete requires admin token', async () => {
        const res = await req.delete('/products/6')
        expect(res.status).toBe(401)
    });


    
});