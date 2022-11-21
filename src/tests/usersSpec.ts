import supertest from 'supertest';
import app from '../server';
import {UserStore, User} from '../models/users'


const users = new UserStore(); 
const req = supertest(app);


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




describe('endpoints testing for Users handlers', () => {
    it('index shows all users if admin requested', async () => {
        const res = await req.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')
        expect (res.status).toBe(302);
    });

    it('index is unauthorized if a normal user uses it', async () => {
        const res = await req.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')
        expect (res.status).toBe(401);
    });

    it('show returns a user that the admin requests', async () => {
        const res = await req.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')
        expect (res.status).toBe(302);
    });

    it('create creates a user and returns a token', async () => {
        const res = await req.post('/users').send({
            firstname: 'joe',
            lastname: 'doe',
            email: 'joe@gmail.com',
            password: '789'
        })
        expect(res.status).toBe(201);
    });


    it('update updates authorized user and returns new user in JSON', async () => {
        const res = await req.patch('/users/1').send({
            firstname: 'mena',
            lastname: 'saleh',
            email: 'mena@gmail.com',
            password: '123'
        })
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')
      
        expect(res.status).toBe(200);
    });


    it('update requires own user authorization', async () => {
        const res = await req.patch('/users/1').send({
            firstname: 'mena',
            lastname: 'saleh',
            email: 'mena@gmail.com',
            password: '123'
        })
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')
        expect(res.status).toBe(401);
    });


    it('delete requires own user authorization', async () => {
        const res = await req.delete('/users/2')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')
        expect(res.status).toBe(401);
    });


    it('delete deletes own user account', async () => {
        const res = await req.delete('/users/4')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJqb2UgZG9lIiwiZW1haWwiOiJqb2VAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODg3MDN9.NzJ3aepigFvOdNEGuF0kT5qnDgZp13_lEAesNFbkprw')
        expect(res.status).toBe(200);
    });


    it('authenticate logs user in and returns token', async () => {
        const res = await req.post('/users/authenticate').send({email: 'mena@gmail.com', password: '123'})
        expect(res.status).toBe(302);
    });

    it('authenticate returns not found when user enters wrong email or password', async () => {
        const res = await req.post('/users/authenticate').send({email: 'mena@gmail.com', password: 'IAmAWrongPassword:D'})
        expect(res.status).toBe(404);
    });
    
});

