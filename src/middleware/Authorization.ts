import express, {Request, Response} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'



//Verify that a token is valid (user is logged in)
export const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction) => {
    try {
        //token is passed from request header not url query params or req.body because it is more secure this way, also secret key has to be passed to check the authenticity of the token
        const authorizationHeader : string | undefined = req.headers.authorization
        const token : string = (authorizationHeader as unknown as string).split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);
        
        next();
    } catch (error) {
        //token is wrong, return an error and stop function execution by returning
        res.status(401); //unauthorized request
        res.send(error);
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
            console.log(decoded);
            // console.log("here");
            res.status(401).send(`Unauthorized request, must be an admin to use this functionality`);
        }
        else{
            next();
        }
    } catch (error) {
        //token is wrong, return an error and stop function execution by returning
        res.status(401); //unauthorized request
        res.send(error);
    }
}


export const verifyOwnIDToken = (req: Request, res: Response, next: express.NextFunction): void => {
    try {
        //token is passed from request header not url query params or req.body because it is more secure this way, also secret key has to be passed to check the authenticity of the token
        const authorizationHeader : string | undefined = req.headers.authorization
        const token : string = (authorizationHeader as unknown as string).split(' ')[1];
        const decoded : JwtPayload = ( jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)  )as unknown as JwtPayload;
        if(decoded.id != req.params.id)
        {
            res.status(401);
            res.send(`Unauthorized request, you can only manage your own account`);
        }
        else{
            next();
        }
    } catch (error) {
        //token is wrong, return an error and stop function execution by returning
        res.status(401); //unauthorized request
        res.send(error);
    }
}

