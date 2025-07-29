import { Request, Response, Router } from "express";
import Auth from "../../utils/Auth";
import RegisterController from "./RegisterController";

class RegisterRouter {
    private router = Router();

    private Routes = () => {
        this.router.use(Auth.Safe);
        this.router.post('/new', (req:Request, res:Response) => {RegisterController.Create(req, res)})
        this.router.get('/all', (req:Request, res:Response) => {RegisterController.GetAll(req, res)})
    }

    public Router = () => {
        this.Routes();
        return this.router;
    }
}

export default new RegisterRouter().Router();