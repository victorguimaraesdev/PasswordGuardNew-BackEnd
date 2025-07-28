import { IRegisterReg } from "./RegisterInterface";
import RegisterRepository from "./RegisterRepository";

class RegisterService {
    public Create = async (data: IRegisterReg) => {
        return await RegisterRepository.Create({
            dominio: data.dominio,
            email: data.email,
            password: data.password,
            url: data.url,
            userId: data.userId
        })
    }

    public GetAll = async () => {
        return await RegisterRepository.GetAll();
    }
}

export default new RegisterService();