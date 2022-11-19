import {ProductStore} from '../models/products' //import the model


const products = new ProductStore(); //Create an object of my model

describe('products model testing', () =>
{
    it('should have index method', () => {
        expect(products.index).toBeDefined(); 
    });

    it('index should return a list of products', async () => {
        const result = await products.index();
        expect(result).toEqual([{ id: 1, name: 'potato', price: 5 }, { id: 2, name: 'egg', price: 2 }]);
    });
});