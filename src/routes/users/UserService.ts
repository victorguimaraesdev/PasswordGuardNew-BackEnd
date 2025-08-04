import Crypto from "../../utils/Crypto";
import Password from "../../utils/Password";
import Token from "../../utils/Token";
import RegisterRepository from "../registers/RegisterRepository";
import { IUserLogin, IUserRegister, IUserCheck } from "./UserInterface";
import UserRepository from "./UserRepository";


const TEST_ROLE = String(process.env.TEST_ROLE) || 'user' 

class UserService {

    public Create = async (data: IUserRegister) => {

        if (!/^[a-zA-Z][a-zA-Z0-9._ ]{2,19}$/.test(data.name)) {
            throw new Error('Nome inválido. O nome deve conter apenas letras, números, pontos e sublinhados, e deve ter entre 3 e 20 caracteres.')
        }
        if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/.test(data.email)) {
             throw new Error('Email inválido. O Email deve seguir o formato padrão.')
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/.test(data.password)) {
             throw new Error('Senha inválida. A senha deve ter entre 8 e 50 caracteres e conter pelo menos uma letra, um número e um caractere especial.')
        }
        if (await UserRepository.Email(data.email)) {
            throw new Error('Email já cadastrado')
        }
        const passwordHash = await Password.Hash(data.password);

        return await UserRepository.Create({
            name: data.name,
            email: data.email,
            password: passwordHash
        })
    }

    public Login = async (data: IUserLogin) => {

        const user = await UserRepository.Email(data.email);

        if (!user) {
            throw new Error('Email de usuario não encontrado')
        }

        const isPasswordValid = await Password.Compare(data.password, user.password)
        if(!isPasswordValid) {
            throw new Error('Senha inválida')
        }

        return Token.generate({id: user.id, role: TEST_ROLE})
    }

    public Find = async (id: string) => {

        const user = await UserRepository.Find(id);

        if (!user) {
            throw new Error('Usuario não encontrado')
        }

        return {
            name: user.name,
            email: user.email,
        }
    }
    public Delete = async (id:string, data:IUserLogin) => {

        const user = await UserRepository.Find(id)

        if (!user) {
            throw new Error('Usuario não encontrado')
        }

        if (!await Password.Compare(data.password, user.password)) {
            throw new Error('Senha incorreta')
        }

        return await UserRepository.Delete(String(user.id))
    }
    
    public Check = async (data: IUserCheck) => {

        const user = await UserRepository.Find(data.userId)

        if (!user) {
            throw new Error('Usuario não encontrado')
        }
        
        if (!await Password.Compare(data.password, user.password)) {
            throw new Error('Senha incorreta')
        }

        const encryptPassword = await RegisterRepository.PickPassword(data.registerId);

        if (!encryptPassword || !encryptPassword.password) {
            throw new Error('Erro ao encontrar password')
        }
        const decyptPassword = Crypto.Decrypt(encryptPassword.password)
        return decyptPassword;
    }
}
export default new UserService();