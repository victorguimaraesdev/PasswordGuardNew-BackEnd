import { Response, Request } from "express";
import RegisterService from "./RegisterService";

class RegisterController {
   public Create = async (req:Request, res:Response) => {
    const { id } = req.params
    const {dominio, email, password, url} = req.body

    try {
        if(!dominio || !email || !password || !id) {
            throw new Error('Instituição, email e senha são obrigatórios')
        }

        await RegisterService.Create({dominio, email, password, url, userId: id})
        return res.status(201).json({message: 'Registro realizado com sucesso!'})
    }
    catch (err : any) {
        return res.status(400).json({message: 'Erro ao realizar registro.', error: err.message})
    }
   }

   public GetAll = async (req:Request, res:Response) => {

    try {
        const registers = await RegisterService.GetAll()
        return res.status(200).json(registers)
    }
    catch (err : any) {
        return res.status(400).json({message: 'Erro ao buscar registros.', error: err.message})
    }

   }
}
export default new RegisterController();