import Database from "../../utils/Database"
import { IUserEntity, IUserRegister } from "./UserInterface"
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient();

class UserRepository {

    public Create = async (data: IUserRegister) => {
        try {
            return Database.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }
            })
        }
        catch (err) {
            throw new Error('Erro ao registrar Usuario no banco de dados')
        }
    }

    public Find = async (id: string) => {
        try {
            return Database.user.findFirst({
                where: {id, deletedAt: null}
            })
        }
        catch (err) {
            throw new Error('Erro ao buscar Usuario no banco de dadaos')
        }
    }

    public Email = async (email:string) => {
        try {
            return Database.user.findFirst({
                where: {email, deletedAt: null}
            })
        }
        catch (err) {
            throw new Error('Erro ao buscar Usuario por email no banco de dados')
        }
    }

    public Update = async (data: Partial<IUserEntity>) => {
        try {
            return Database.user.update({
                where: {id: data.id},
                data
            })
        }   
        catch (err) {
            throw new Error('Erro ao atualizar Usuario no banco de dados')
        }
    }

    public Delete = async (id: string) => {
        try {
            return Database.user.update({
                where: {id},
                data: {deletedAt: new Date()}
            })
        }   
        catch (err) {
            throw new Error('Erro ao sdeletar Usuario no banco de dados')
        }
    }
}
export default new UserRepository();