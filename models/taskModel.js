const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
          user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User',
                    require:true,
          },
          title:{
                    type:String,
                    require:true,
          },
          description:{
                    type:String,

          },
          isCompleted:{
                    type:Boolean,
                    require:true,
          },
          rating:{
                    type:Number,
                  min:1,
                  max:5,
          }
          


},{
          timestamps:true
});
module.exports=mongoose.model('Task',taskSchema);