import Database from "../../utils/Database";
import { IRegisterReg } from "./RegisterInterface";

class RegisterRepository {
    public Create = async (data: IRegisterReg) => {
        try {
            return Database.register.create({
                data: {
                    dominio: data.dominio,
                    email: data.email,
                    password: data.password,
                    iconUrl: data.url,
                    userId: data.userId
                }
            })
        }
        catch (err) {
            throw new Error('Erro ao registrar o registro no banco de dados')
        }
    }
    public Find = async (id : number) => {
       try {
        return Database.register.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        })
       } catch (err) {
         throw new Error('Erro erro ao tentar encontrar o registro no banco de dados')
       }
    }
    
    public Delete = async (id: number) => {
    return Database.register.update({
        where: { id: id },
        data: { deletedAt: new Date() }
    });
}

    public GetAll = async (id: string) => {
        try {
            return Database.register.findMany({
                where: {
                    userId: id, 
                    deletedAt: null
                }
            });
        }
        catch (err) {
            throw new Error('Erro ao buscar os registros no banco de dados')
        }
    }
    public PickPassword = async (id: number) => {
        try {
            return Database.register.findFirst({
                where: {
                    id: id,
                    deletedAt: null
                },
                select: {
                    password: true
                }
            });
        }
        catch (err) {
            throw new Error('Erro ao puscar senha no banco de dados')
        }
    }
}

export default new RegisterRepository();