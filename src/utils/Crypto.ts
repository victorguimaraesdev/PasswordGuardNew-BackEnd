import CryptoJS from 'crypto-js';

export class Crypto {
  private secretKey = process.env.KEY || "MasterKey"

  public Encrypt = (text:string) : string => {
    try{
        const encryptText = CryptoJS.AES.encrypt(text, this.secretKey).toString();
        return encryptText;
    }
    catch (err) {
        throw new Error('Não foi possivel encriptar o password do registro')
    }
  }

  public Decrypt = (encryptText:string) : string  => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptText, this.secretKey);
        const realText = bytes.toString(CryptoJS.enc.Utf8);
        return realText
    }
    catch (err) {
        throw new Error('Não foi possivel descriptografar o texto')
    }
  }
}
export default new Crypto();

