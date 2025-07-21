import { PrismaClient } from '@prisma/client'

class Database {
    private static prisma = new PrismaClient();

    public static Return = () => {
        return Database.prisma;
    }
}
export default Database.Return();