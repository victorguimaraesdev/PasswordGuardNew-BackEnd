import { Request, Response, Router } from "express";
import Auth from "../../utils/Auth";
import UserController from "./UserController";

class UserRouter {
    private router = Router();

    private Routes = () => {
        this.router.use(Auth.Free);
        this.router.post('/reg', (req:Request, res:Response) => { UserController.Create(req, res)})
        this.router.post('/log', (req:Request, res:Response) => { UserController.Login(req, res)})
    }

    public Router = () => {
        this.Routes();
        return this.router;
    }
}

export default new UserRouter().Router();