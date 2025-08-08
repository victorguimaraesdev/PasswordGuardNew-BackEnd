import  express  from "express";
import cors from 'cors';
import UserRouter from "./routes/users/UserRouter";
import RegisterRouter from "./routes/registers/RegisterRouter";

class App {

    private express = express();

    constructor() {
        this.CorsOptions();
        this.Middleware();
        this.Routes();
    }

    private CorsOptions = () => {
        this.express.use(cors({
            origin: 'https://password-guard-new.vercel.app/',
            methods: 'GET, PUT, POST, DELETE',
            allowedHeaders: 'Content-Type, Authorization',
            exposedHeaders: 'Content-Type, Authorization'
        }))
    }

    private Middleware = () => {
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
    }

    private Routes = () => {
        this.express.get('/', (_, res)=> {res.status(200).json({message: 'Hello World'})})
        this.express.use('/users', UserRouter);
        this.express.use('/registers', RegisterRouter)
    }

    public Start = (porta: number) => {
        this.express.listen(porta, () => {
            console.log(`Servidor em andamento na porta: ${porta}`);
        })
    }
}
export default new App();