const db = require("../config/db");

const getTasks = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM task")
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records Found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All Task records',
            totalTasks: data[0].length,
            data: data[0]
        })
    }
    catch {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get All Student API'
        })
    }
};
const getTaskByID = async (req, res) => {
    try {
        const taskID = req.params.id
        if (!taskID) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID'
            })
        }
        //chances of getting SQL injction ('SELECT * FROM students WHERE id =1+studentID)
        const data=await db.query(`SELECT * FROM task WHERE id=?`,[taskID])
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No Records Found'
            })
        }
        res.status(200).send({
            success:true,
            taskDetails:data[0]
        })
            }
    catch {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get Tasks By API'
        })
    }
};

//CREATE TASKS
const createTasks = async(req,res) => {
    try{
        const {title,description,creation_date,due_date,assignment} =req.body
        if (!title || !description || ! creation_date || !due_date || !assignment){
            return res.status(500).send({
                success:false,
                messsage:'Please provide all fields'
            })
        }

        const data = await db.query(`INSERT INTO task (title,description,creation_date,due_date,assignment) VALUES(?,?,?,?,?)`,[title,description,creation_date,due_date,assignment]);
        if(!data) {
            return res.status(404).send({
                success:false,
                message:'Error In INSERT QUERY'
            })
        }
        res.status(201).send({
            success:true,
            message:'New Task Record Created',
        })
    }catch(error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in Create Task API',
                error
            })
        }
    };


    //UPDATE TASKS
    const updateTasks = async (req,res) =>{
        try {
            const taskID = req.params.id
            if(!taskID){
                return res.status(404).send({
                    success:false,
                    message:'Invalid ID',
                })
            }
            const {title,description,creation_date,due_date,assignment} =req.body
            const data = await db.query(`UPDATE task SET title=?,description=?,creation_date=?,due_date=?,assignment=? WHERE id =? `,[title,description,creation_date,due_date,assignment,taskID]);
            if(!data){
                return res.status(500).send({
                    success:false,
                    message:'Error in Update Data',
                });
            }
            res.status(200).send({
                success:true,
                message:'Task Details Updated',
            })

        }catch(error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in Update Task API',
                error
            })
        }
    };


    //DELETE STUDENT
    const deleteTasks =async (req,res) => {
        try {
            const taskID = req.params.id
            if(!taskID){
                return res.status(404).send({
                    success:false,
                    message:'Please  provide Task Id '
                })
            }await db.query(`DELETE FROM task WHERE id =?`, [taskID])
            res.status(200).send({
                success:true,
                message:'Task deleted successfully'
            });
        }catch(error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in Delete Task API',
                error
            })
        }
    }

module.exports = { getTasks,getTaskByID,createTasks, updateTasks, deleteTasks};