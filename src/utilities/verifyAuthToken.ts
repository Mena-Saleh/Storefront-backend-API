import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'



const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction) => {
    try {
        //token is passed from request header not url query params or req.body because it is more secure this way, also secret key has to be passed to check the authenticity of the token
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as unknown as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
        
        next();
    } catch (error) {
        //token is wrong, return an error and stop function execution by returning
        res.status(401); //unauthorized request
    }
}

export default verifyAuthToken;