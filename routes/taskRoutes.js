const express=require('express');

const { getTasks, getTaskByID, createTasks, updateTasks, deleteTasks } = require('../controllers/taskControllers');


// router object
const router=express.Router()

//routers
//GET ALL STUDENTS LIST || GET
router.get('/getall',getTasks);

router.get('/get/:id',getTaskByID);

//CREATE  TASKS ||POST
router.post('/create',createTasks );

//UPDATE TASKS
router.put('/update/:id',updateTasks);

//DELETE TASKS
router.delete('/delete/:id', deleteTasks);

module.exports=router