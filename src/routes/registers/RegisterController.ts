import { Response, Request } from "express";
import RegisterService from "./RegisterService";

class RegisterController {
   public Create = async (req:Request, res:Response) => {
    const {dominio, email, password, url, userId} = req.body

    try {
        if(!dominio || !email || !password || !userId) {
            throw new Error('Domino, email, senha e id são obrigatórios')
        }

        await RegisterService.Create({dominio, email, password, url, userId})
        return res.status(201).json({message: 'Registro realizado com sucesso!'})
    }
    catch (err : any) {
        return res.status(400).json({message: 'Erro ao realizar registro.', error: err.message})
    }
   }

   public GetAll = async (req:Request, res:Response) => {
    
    const {userId} = req.body

    if (!userId) return res.status(400).json({message: 'Id do usuario ausente.'})

    try {
        const registers = await RegisterService.GetAll(userId)
        return res.status(200).json(registers)
    }
    catch (err : any) {
        return res.status(400).json({message: 'Erro ao buscar registros.', error: err.message})
    }

   }
   public Delete = async (req:Request , res:Response) => {
    
    const {id} = req.params
    const {userId} = req.body

    try {
        if (!id || !userId) {
             throw new Error('userId ou registerId auxentes')
        }
        await RegisterService.Delete(Number(id))
        return res.status(200).json({message: 'Registro deletado com sucesso'})
    }
    catch (err : any){
        return res.status(400).json({message: 'Erro ao deletar registro.', error: err.message})
    }
   }
}
export default new RegisterController();