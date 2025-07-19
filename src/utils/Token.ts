import jwt from 'jsonwebtoken';

const JWT_SECRET =  process.env.JWTSECRET || 'default';

interface UserCredentials {
    id: string;
    role: string;
}

class Token {
    public Generate = (user: UserCredentials):string => {
        try {
            return jwt.sign({id: user.id, role:user.role}, JWT_SECRET, {expiresIn: '72h'})
        }
        catch (err){
            throw new Error('Erro ao gerar o token');
        }
    }
    public verify = (token: string): UserCredentials => {
        try {
            return jwt.verify(token, JWT_SECRET) as UserCredentials;
        }
        catch (err) {
            return {id: '', role: ''}
        }
    }
}
export default new Token();