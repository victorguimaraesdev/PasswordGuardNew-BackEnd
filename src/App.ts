import  express  from "express";
import cors from 'cors';

class App {

    private express = express();

    constructor() {
        this.CorsOptions();
        this.Middleware();
        this.Routes();
    }

    private CorsOptions = () => {
        this.express.use(cors({
            origin: '*',
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
    }

    public Start = (porta: number) => {
        this.express.listen(porta, () => {
            console.log(`Servidor em andamento na porta: ${porta}`);
        })
    }
}
export default new App();