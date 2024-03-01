import mongoose, {Mongoose} from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL ;

interface MongooseConnection {
    conn : Mongoose | null;
    promise : Promise<Mongoose> | null;
}

let cashed: MongooseConnection = (global as any).mongoose 

if(!cashed){
    cashed = (global as any).mongoose = {conn: null, promise: null}
}

export const connectToDatabase = async () => {
    if(cashed.conn){
        return cashed.conn;
    }
    
    if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');
    
    cashed.promise = cashed.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'imaginify',
        bufferCommands: false,
    });

    cashed.conn = await cashed.promise;
    return cashed.conn;
}
