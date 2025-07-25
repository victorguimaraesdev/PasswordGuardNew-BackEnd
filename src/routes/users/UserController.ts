import { Response, Request } from "express";
import UserService from "./UserService";
import Token from "../../utils/Token";

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
            return res.status(400).json({ message: 'Erro ao criar usuario', error: err.message })
        }
    }
    public Login = async (req:Request, res:Response) : Promise<Response> => {

        const { email, password } = req.body;

        try{
            if (!email || !password) {
                throw new Error('Email e Password são necessarios')
            }

            const Token = await UserService.Login({email, password})
            return res.status(200).json({ Token }) 

        }
        catch (err: any) {
            return res.status(400).json({message: 'Erro ao realizar o Login', error: err.message})
        }


    }
}
export default new UserController();