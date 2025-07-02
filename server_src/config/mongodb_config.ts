import mongoose from 'mongoose'
import { logger } from '../utils/errors';

const connectDB = async()=>{
    try{
      const connect = await mongoose.connect(`${process.env.MONGO_CONNNECTION_STR}`);
      console.log("DB connected", 
                   connect.connection.host,
                   connect.connection.name)

    }catch(error){
        logger.log('error', "DB error : "+error);
        process.exit(1);
    }
}

export default connectDB;