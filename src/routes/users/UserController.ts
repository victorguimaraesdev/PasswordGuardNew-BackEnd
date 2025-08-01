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
            return res.status(400).json({ message: 'Erro ao criar usuario', error: err.message })
        }
    }
    public Login = async (req:Request, res:Response) : Promise<Response> => {

        const { email, password } = req.body;

        try{
            if (!email || !password) {
                throw new Error('Email e Password são necessarios')
            }

            const token = await UserService.Login({email, password})
            return res.status(200).json({ token }) 

        }
        catch (err: any) {
            return res.status(400).json({message: 'Erro ao realizar o Login', error: err.message})
        }
    }
    public Find = async (req:Request, res:Response) : Promise<Response> => {
        const {userId} = req.body
        
        if (!userId){
            throw new Error('Id de usuario ausente')
        }

        try {
            const usuario = await UserService.Find(userId)
            return res.status(200).json({usuario})
        }
        catch (err : any) {
            return res.status(401).json({message: 'Erro ao encontrar usuario', error: err.message})
        }
    }
    public Check = async (req:Request, res:Response) : Promise<Response> => {
        const {userId, password} = req.body

        try {
            if (!userId) {
               throw new Error('Id de usuario ausente')
            }
            const usuario = await UserService.Check({userId, password})
            return res.status(200).json(usuario)
        }
        catch(err : any) {
            return res.status(404).json({message: 'Não foi possivel checar o password', error: err.message})
        }

    }
}
export default new UserController();