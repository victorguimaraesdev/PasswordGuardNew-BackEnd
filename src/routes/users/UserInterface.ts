
export interface IUserEntity {
    id: string;
    name: string;
    emai: string;
    password: string;
}

export interface IUserRegister {
    name: string
    email: string
    password: string
}

export interface IUserLogin {
    email: string
    password: string
}