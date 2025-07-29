
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default';

interface IUserPayload {
    id: string;
    role: string;
}

class Token {
    public generate = (user:IUserPayload) : string => {
        try {
            return jwt.sign({id:user.id, role:user.role}, JWT_SECRET, {expiresIn: '72h'})
        }
        catch (err) {
             throw new Error('Erro ao gerar Token');
        }
    }
    public verify = (token: string) :  IUserPayload => {
        try {
            return jwt.verify(token, JWT_SECRET) as IUserPayload;
        }
        catch (err) {
            throw new Error('Não conseguimos verificar o Token')
        }
    }
}
export default new Token();