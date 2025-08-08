require('dotenv').config();
const express=require('express');
 const dbconnection=require('./config/dbConnection'); 

const app=express();
const Port= process.env.PORT || 5001;



dbconnection(); 

app.use(express.json()); //middleware here

app.use('/auth',require('./routes/auth'));
app.use('/tasks',require('./routes/todoRoutes'));
app.listen(Port,()=>{
          console.log(`server is listening to Port: ${Port}`);
})