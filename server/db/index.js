import mongoose from 'mongoose';
const dbConnect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://khushijaiswal2023:CWpNTF3cgDPuBnKA@cluster0.psagfmi.mongodb.net/");
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err);
    }
}

export const closeDb = async ()=>{
    try{
       await mongoose.connection.close()
    } catch(e){
       console.log(e);
    }
}
export default dbConnect;
