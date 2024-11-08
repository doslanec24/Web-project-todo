import fs from 'fs'
import path from 'path'
import { hash } from 'bcrypt'
import { pool } from './db.js'
import pkg from 'jsonwebtoken'
const {sign}=pkg;

import dotenv from 'dotenv'
dotenv.config();

const __dirname = import.meta.dirname

const initializetestDb = ()=>{
    const sql = fs.readFileSync(path.resolve(__dirname,"../database.sql"),"utf8");
    pool.query(sql)
}

const insertTestUser=(email,password)=>{
    hash(password,10,(error,hashedPassword)=>{
        pool.query('insert into account (email,password) values ($1,$2)',
            [email,hashedPassword])
    })
}

const getToken = (email)=>{
    return sign ({user: email},process.env.JWT_SECRET_KEY)
}

export {initializetestDb,insertTestUser,getToken}