import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import products_routes from './handlers/products';
import users_routes from './handlers/users';
import orders_routes from './handlers/orders';


//server port and instance of express
const port = 3000;
const app: express.Application = express();

const corsOptions = {
    //white listing foreign domains
    origin: 'http://someotherdomain.com', 
    optionsSuccessStatus: 200
}


//using cors library with its configuration, and using bodyparser
app.use(cors(corsOptions));
app.use(bodyParser.json());



//server initialization
app.listen(port, () => {
  console.log('server is listening on port ' + port);
});

//Home route with cors enabled
app.get('/', cors(corsOptions) ,(req: Request, res: Response) => {
    res.send("This is the home page of the API :) check the README file for info on how to use the API");
})




//Passing RESTful route handlers to the express app instance:
products_routes(app);
users_routes(app);
orders_routes(app);


