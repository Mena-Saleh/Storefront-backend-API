import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import products_routes from './handlers/products';
import users_routes from './handlers/users';


const port = 3000;
const app: express.Application = express();

const corsOptions = {
    origin: 'http://someotherdomain.com', //white listing foreign domains
    optionsSuccessStatus: 200
}


//tell express to use the cors library and pass in the cors options we configured:
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('server is listening on port ' + port);
});

//passing cors as a middle ware in our routes
app.get('/', cors(corsOptions) ,(req: Request, res: Response) => {
    res.send("hello people of the server!");
})




//To use routes in my handler, all I need to do is call my routes function and pass my app instance and the routes will be mapped to their model functions
products_routes(app);
users_routes(app);


