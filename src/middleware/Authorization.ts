import express, {Request, Response} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'



//verify that a token is valid (user is logged in)
export const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const authorizationHeader : string | undefined = req.headers.authorization
        const token : string = (authorizationHeader as unknown as string).split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);
        
        next();
    } catch (error) {
        res.status(401);
        res.send("Invalid Token");
    }
}

//verify that a token is valid and belongs to an admin.
export const verifyAdminToken = (req: Request, res: Response, next: express.NextFunction): void => {
    try {
        const authorizationHeader : string | undefined = req.headers.authorization
        const token : string = (authorizationHeader as unknown as string).split(' ')[1];
        const decoded : JwtPayload = ( jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)  )as unknown as JwtPayload;
        if(decoded.role !== 'admin')
        {
            console.log(decoded);
            res.status(401).send(`Unauthorized request, must be an admin to use this functionality`);
        }
        else{
            next();
        }
    } catch (error) {
        res.status(401); 
        res.send("Invalid Token");
    }
}

//verify that a token is valid, and that the id in request params matches the id in the token (so that users can manage what belongs to them only)
export const verifyOwnIDToken = (req: Request, res: Response, next: express.NextFunction): void => {
    try {
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
        res.status(401);
        res.send("Invalid Token");
    }
}

