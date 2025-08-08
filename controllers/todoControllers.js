
const Task=require('./../models/taskModel');

exports. createTask=async(req,res)=>{
          try{
                    const{title,description,isCompleted,rating}=req.body;
                    const newTask= await Task.create({
                         title,
                         description,
                         isCompleted,
                         rating,
                        user: req.user._id       
                    });
                     res.json({success:true,message:'Task created sucessfully',task:newTask});
          }catch(error){
                    res.status(500).json({message:error.message});
          }
         
}
exports. getAllTasks=async(req,res)=>{
          try{

                    const getTask=await Task.find({user:req.user._id});
                    res.status(200).json({success:true,getTask});

          } catch(error){
                    res.status(500).json({message:error.message});
     
          }        
}
exports. updateTask=async(req,res)=>{
          try{

                    const updateTask= await Task.findOneAndUpdate(
                     {_id:req.params.id,user:req.user._id},
                     req.body,
                     {new :true}                     
                    );
                    if(!updateTask){
                              return res.status(404).json({sucess:false,message:'Task not found or aunthorized'});
                    }

                    res.status(200).json({success:true,message:"Task updated sucessfully",updated:updateTask});
          }catch(error){
           res.status(500).json({message:error.message});
        
          }
}
exports. deleteTask=async(req,res)=>{

          try{
                    const deleteTask=await Task.findOneAndDelete(

                              {_id:req.params.id,user:req.user._id}
                    );
                    if(!deleteTask){
                              return res.status(404).json({success:false,messgae:'Task not found to delete or task is authorized'});
                    }
                     res.status(200).json({
                     success: true,
                    message: 'Task deleted successfully',
                    });

          }catch(error){
                    res.status(500).json({message:error.message});
          }
}
exports. rateTask=async(req,res)=>{
          try{
                    const {rating}=req.body;


                    if(rating<1 || rating>5){
                              return res.status(400).json({
                              success: false,
                              message: 'Rating must be between 1 and 5',
                    });
                    }
                   const rateTask=await Task.findOneAndUpdate(
                              {_id:req.params.id,user:req.user._id},
                              {rating},
                              {new :true}
                    );

                    if(!rateTask){
                    return res.status(404).json({ success: false, message: 'Task not found or not authorized' });
                    }

                     res.status(200).json({
                     success: true,
                    message: 'Task rated successfully',
                    rateTask,
                    });
          }catch(error){
                    res.status(500).json({message:error.message});
          }
}

exports.getAverageRating=async(req,res)=>{
          try{
       const result=   await Task.aggregate([
          {$match:{user:req.user._id}},
          {
                    $group:{
                              _id:null,
                              averageRating:{$avg:"$rating"},
                              totalTask:{$sum:1},
                              ratedTask:{
                                        $sum:{
                                                  $cond:[{$ifNull:["$rating",false]},1,0]
                                        }
                              }
                    }
          }
          ]);
           const data = result[0] || {
          averageRating: 0,
          totalTasks: 0,
          ratedTasks: 0
           };

    res.status(200).json({
      success: true,
      message: "Aggregated task rating stats",
      stats: data
    });
}catch(error){
           res.status(500).json({ message: error.message });
}
}