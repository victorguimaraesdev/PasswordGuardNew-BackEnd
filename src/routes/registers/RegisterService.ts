import  Crypto  from "../../utils/Crypto";
import { IRegisterReg} from "./RegisterInterface";
import RegisterRepository from "./RegisterRepository";

class RegisterService {
    public Create = async (data: IRegisterReg) => {
        
        const passwordCrypt = Crypto.Encrypt(data.password);

        return await RegisterRepository.Create({
            dominio: data.dominio,
            email: data.email,
            password: passwordCrypt,
            url: data.url,
            userId: data.userId
        })
    }

    public GetAll = async (id : string) => {

       const registers = await RegisterRepository.GetAll(id);
       const filterdRegisters = registers.map(({ password, ...rest }) => rest);

       return filterdRegisters
    }

    public Delete = async (registerId:number) => {

    const register = await RegisterRepository.Find(registerId);

        console.log(registerId)

    if (!register) {
        throw new Error("O registro não foi encontrado");
    }

    await RegisterRepository.Delete(registerId);
    }
}

export default new RegisterService();