

import mongoose from "mongoose";
export const connectDB=async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL)
        if(conn){
            console.log(`mongodb connected successfully to ${conn.connection.host}`)
        }
        
    } catch (error) {
        console.log(`mongodb connect error ${error}`)
        
    }
}