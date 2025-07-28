import { IRegisterReg } from "./RegisterInterface";
import RegisterRepository from "./RegisterRepository";

class RegisterService {
    public Create = async (data: IRegisterReg) => {
        return await RegisterRepository.Create({
            name: data.name,
            email: data.email,
            password: data.password
        })
    }
}

export default new RegisterService();