import { Response, Request } from "express";
import RegisterService from "./RegisterService";

class RegisterController {
   public Create = async (req:Request, res:Response) => {

    const {dominio, email, password, url} = req.body

    try {
        if(!dominio || !email || !password) {
            throw new Error('Instituição, email e senha são obrigatórios')
        }

        await RegisterService.Create({dominio, email, password, url})
        return res.status(201).json({message: 'Registro realizado com sucesso!'})
    }
    catch (err : any) {
        return res.status(400).json({message: 'Erro ao realizar registro.', error: err.message})
    }

   }
}
export default new RegisterController();