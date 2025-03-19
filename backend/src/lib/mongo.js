const mongoose=require("mongoose")

const connectDB=async ()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb connected: ",connect.connection.host)
    } catch (error) {
        console.log("Error in connectDB: ",error.message)
    }
}

module.exports=connectDB