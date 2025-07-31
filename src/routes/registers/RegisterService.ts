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

    public GetAll = async (id : string) => {
        return await RegisterRepository.GetAll(id);
    }
    public Delete = async (id: number) => {

    const register = await RegisterRepository.Find(id);

    if (!register) {
        throw new Error("O registro não foi encontrado");
    }

    await RegisterRepository.Delete(id);
    }
}

export default new RegisterService();