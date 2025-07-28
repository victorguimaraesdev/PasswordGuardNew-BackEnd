import Database from "../../utils/Database";
import { IRegisterReg } from "./RegisterInterface";

class RegisterRepository {
    public Create = async (data: IRegisterReg) => {
        try {
            return Database.register.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }
            })
        }
        catch (err) {
            throw new Error('Erro ao registrar o registro no banco de dados')
        }
    }
}

export default new RegisterRepository();