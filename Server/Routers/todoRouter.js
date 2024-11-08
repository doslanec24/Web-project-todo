import { pool } from "../helper/db.js";
import { Router } from "express";
//import { emptyOrRows } from "../helper/utils.js";
import { auth } from "../helper/auth.js";
import {getTasks, postTask} from '../Controllers/TaskController.js'

const todoRouter = Router()

todoRouter.get('/',getTasks)

todoRouter.get('/',(req,res,next)=>{
    pool.query('select * from task',(error,result)=>{
        if(error)   return next(error)
        return res.status(200).json(emptyOrRows(result))
    })
})

todoRouter.post('/create',auth,(req,res,next)=>{
    const { description } = req.body;
    
    if (!description || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required' });
    }
    pool.query('insert into task(description) values ($1) returning *',
        [description],
        (error,result)=>{
            if(error)   return next(error)
            return res.status(200).json({id: result.rows[0].id})
        }
    )
})

todoRouter.delete('/delete/:id',(req,res)=>{
    const id= parseInt(req.params.id)
    pool.query('delete from task where id = $1',
        [id],
        (error,result)=>{
            if(error){
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: id})
        }
    )
})

export default todoRouter;