import client from '../database';
import {UserStore, User} from '../models/users' 

console.log(client);
const users = new UserStore(); 


//User model test suite:
describe('users model testing', () =>
{
    it('should have an index method', () => {
        expect(users.index).toBeDefined(); 
    });

    it('index should return a list of users', async () => {
        const result = await users.index();
        expect(result.length).toBe(3);
        expect(result[0].email).toEqual('mena@gmail.com');
        expect(result[0].lastname).toEqual('saleh');
        expect(result[2].email).toEqual('maria@gmail.com');

    });

    it('should have a show method', () => {
        expect(users.show).toBeDefined(); 
    });

    it('show should return a user', async () => {
        const result = await users.show('1');
        expect(result.email).toEqual('mena@gmail.com');
        expect(result.firstname).toEqual('mena');
        expect(result.role).toEqual('admin');
    });


    it('should have a create method', () => {
        expect(users.create).toBeDefined(); 
    });

    it('create should create new user and return it', async () => {
        const createTestUser: User =
         {
            firstname: 'mo',
            lastname: 'salah',
            email: 'mo@gmail.com',
            password: '$2b$10$nEfMiGToRkN9coB5lPs4.uldf.5HMS64MEvc9lZbGflwYgJ9ynl0a',
            role: 'user'
        }
        const result = await users.create(createTestUser);
        expect(result.email).toEqual('mo@gmail.com');
        expect(result.firstname).toEqual('mo');
        expect(result.role).toEqual('user');
    });

    it('should have a delete method', () => {
        expect(users.delete).toBeDefined(); 
    });

    it('delete should delete existing user and return it', async () => {
        const result = await users.delete('4');
        expect(result.email).toEqual('mo@gmail.com');
        expect(result.firstname).toEqual('mo');
        expect(result.role).toEqual('user');
    });

    it('should have an update method', () => {
        expect(users.update).toBeDefined(); 
    });

    it('update should update user and return new user info', async () => {

        const updateTestUser: User =
        {
            firstname: 'mena',
            lastname: 'ashraf',
            email: 'mena@gmail.com',
            password: '$2b$10$nEfMiGToRkN9coB5lPs4.uldf.5HMS64MEvc9lZbGflwYgJ9ynl0a',
            role: 'admin'
        }
        const result = await users.update('1', updateTestUser);
        expect(result.email).toEqual('mena@gmail.com');
        expect(result.lastname).toEqual('ashraf');

    });

    
    it('should have an authenticate method', () => {
        expect(users.update).toBeDefined(); 
    });

    it('authenticate returns null if authentication fails', async () => {

        const result = await users.authenticate('mene@gmail.com', 'notTheRightPassword');
        expect(result).toEqual(null);

    });
    it('authenticate returns user on success', async () => {

        const result = await users.authenticate('mene@gmail.com', '123');
        expect(result).toBeTruthy;

    });
 
 
});