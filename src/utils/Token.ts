
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default';

interface IUserPayload {
    userId: string;
    role: string;
}

class Token {
    public generate = (user:IUserPayload) : string => {
        try {
            return jwt.sign({id:user.userId, role:user.role}, JWT_SECRET, {expiresIn: '72h'})
        }
        catch (err) {
             throw new Error('Erro ao gerar Token');
        }
    }
    public verify = (token: string) :  IUserPayload | null => {
        try {
            return jwt.verify(token, JWT_SECRET) as IUserPayload;
        }
        catch (err) {
            return null
        }
    }
}
export default new Token();