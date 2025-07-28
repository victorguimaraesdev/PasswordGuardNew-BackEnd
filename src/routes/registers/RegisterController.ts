import { Response, Request } from "express";
import RegisterService from "./RegisterService";

class RegisterController {
   public Create = async (req:Request, res:Response) => {

    const {name, email, password} = req.body

    try {
        if(!name || !email || !password) {
            throw new Error('Todos os campos são necessarios.')
        }
        
        await RegisterService.Create({name, email, password})
        return res.status(201).json({message: 'Registro realizado com sucesso!'})
    }
    catch (err : any) {
        return res.status(400).json({message: 'Erro ao realizar registro.', error: err.message})
    }

   }
}
export default new RegisterController();