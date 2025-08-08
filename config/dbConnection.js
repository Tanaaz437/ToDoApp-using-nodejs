const mongoose=require("mongoose");
const dbconnection=async()=>{
          try{
                    const conn=await mongoose.connect(process.env.MONGODB_URI); 
                    console.log(`Connect to Database : ${conn.connection.host}`);
                           
          }catch(error){
                    console.log(error);
                    
          }
}
module.exports=dbconnection;