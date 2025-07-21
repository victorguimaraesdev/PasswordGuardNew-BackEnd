import bcrypt from 'bcryptjs'

class Password {
    public Hash = async (password: string) : Promise<string> => {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password,salt)
        }
        catch (err) {
            throw new Error('Erro ao gerar o hash da senha')
        }
    }
    public Compare = async (password:string, hashedPassword:string) => {
        try {
            return await bcrypt.compare(password, hashedPassword);
        }        
        catch (Err) {
            throw new Error('Erro ao comparar a senha')
        }
    }
}
export default new Password();