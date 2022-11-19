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


//Let express use the cors library and pass in the cors options configured previously.
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('server is listening on port ' + port);
});

//Home route with cors enabled
app.get('/', cors(corsOptions) ,(req: Request, res: Response) => {
    res.send("This is the home page of the API :)");
})




//Passing RESTful route handlers to the express app instance:
products_routes(app);
users_routes(app);


