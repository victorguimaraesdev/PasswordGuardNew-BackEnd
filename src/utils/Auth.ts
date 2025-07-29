
import { Request, Response, NextFunction } from "express";
import Token from "./Token";

class Auth {
    public Free = (req:Request, res:Response, next:NextFunction) => {

        const { authorization } = req.headers;

        if (authorization) {

            const token = authorization.split(' ')[1]

            if(!token) {
                return res.status(404).json({error: 'Token ausente' })
            }

            try {
                const decoded = Token.verify(token)
                if (!req.body) req.body = {};
                req.body.userId = decoded?.id
                return next();
            }
            catch (err) {
                return next();
            }
        }
        return next();
    }
    public Safe = (req:Request, res:Response, next:NextFunction) => {

        const {authorization} = req.headers;

        if (!authorization) {
            return res.status(404).json({error: 'Autorização ausente'})
        }

        const token = authorization.split(' ')[1]

        if (!token) {
            return res.status(404).json({error: 'Token ausente'});
        }

        try {
            const decoded = Token.verify(token);
            req.body.userId = decoded.id;
            return next();
        }
        catch (err) {
            return res.status(401).json({error: 'Token invalido'})
        }

    }

    public Admin =  (req:Request, res:Response, next:NextFunction) => {
        
        const {authorization} = req.headers;

        if(!authorization) {
            return res.status(404).json({error: 'Authorization ausente'})
        }

        const token = authorization.split(' ')[1];

        if(!token) {
            return res.status(404).json({error: 'Token ausente'})
        }

        try {
            const decoded = Token.verify(token);
            req.body.userId = decoded?.id;
            if(decoded?.role != 'admin'){
                return res.status(403).json({error: 'Acesso negado'})
            }
            return next();
        }
        catch (err) {
            return res.status(401).json({error: 'Token invalido'})
        }
    }
}
export default new Auth();