import { Response, Request } from "express";
import UserService from "./UserService";

class UserController {
    public Create = async (req:Request, res:Response) : Promise<Response> => {

        const {name, email, password} = req.body;

        try {

            if (!name || !email || !password) {
                throw new Error('Necessario nome, email e senha')
            }

            await UserService.Create({name, email, password});
            return res.status(201).json({ message: 'Usuario criado com sucesso' })
        }
        catch (err: any) {
            return res.status(400).json({ message: 'Erro ao criarusuario', error: err.message })
        }
    }
}
export default new UserController();