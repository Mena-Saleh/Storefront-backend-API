import express, {Request, Response} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'



//Verify that a token is valid (user is logged in)
export const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction): void => {
    try {
        //token is passed from request header not url query params or req.body because it is more secure this way, also secret key has to be passed to check the authenticity of the token
        const authorizationHeader : string | undefined = req.headers.authorization
        const token : string = (authorizationHeader as unknown as string).split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);
        
        next();
    } catch (error) {
        //token is wrong, return an error and stop function execution by returning
        res.status(401); //unauthorized request
    }
}

export const verifyAdminToken = (req: Request, res: Response, next: express.NextFunction): void => {
    try {
        //token is passed from request header not url query params or req.body because it is more secure this way, also secret key has to be passed to check the authenticity of the token
        const authorizationHeader : string | undefined = req.headers.authorization
        const token : string = (authorizationHeader as unknown as string).split(' ')[1];
        const decoded : JwtPayload = ( jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)  )as unknown as JwtPayload;
        if(decoded.role !== 'admin')
        {
            throw new Error(`You have to be an admin to use this feature.`);
        }
        next();
    } catch (error) {
        //token is wrong, return an error and stop function execution by returning
        res.status(401); //unauthorized request
    }
}

