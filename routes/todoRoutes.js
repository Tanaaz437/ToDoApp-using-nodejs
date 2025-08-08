const express=require('express');
const router=express.Router();
const protect=require('./../middlewares/protectRoutes');
const {
          createTask,getAllTasks,updateTask,deleteTask,rateTask,getAverageRating
}=require('./../controllers/todoControllers');



router.post('/',protect,createTask);
router.get('/',protect,getAllTasks);
router.put('/:id',protect,updateTask)
router.delete('/:id',protect,deleteTask)
router.get('/rating',protect, rateTask);
router.get('/avg-rating',protect, getAverageRating);
// MongoDB aggregation route


module.exports=router;