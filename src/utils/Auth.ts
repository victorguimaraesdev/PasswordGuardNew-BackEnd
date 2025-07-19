import { Request, Response, NextFunction } from "express";
import Token from "./Token";

class Auth {
    public Free = (req: Request, res: Response, next: NextFunction) => {
        const {authorization} = req.headers;

        if (authorization) {
            const token = authorization.split(' ')[1];

            if(!token) {
                return res.status(401).json({error: 'Token necessario'});
            }

            try {
                const decoded = Token.verify(token);
                if(!req.body) req.body = {};
                req.body.userId = decoded.id;
                return next();
            }
            catch (err) {
                return res.status(401).json({Error: 'Token Invalido'});
            }
        } 

        return next();
    }
}
export default new Auth();