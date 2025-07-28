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
                    iconUrl: data.url
                }
            })
        }
        catch (err) {
            throw new Error('Erro ao registrar o registro no banco de dados')
        }
    }
}

export default new RegisterRepository();