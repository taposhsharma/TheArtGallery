const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const client = require('../connection/db')
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const upload = multer({dest: "uploads/",
    limits: {
      fieldSize: 50 * 1024 * 1024 // 10MB
    }
  });

  const authenticate = require('../verifyToken')
  
  router.get("/post",authenticate,async ( req ,res)=>{
    console.log(req.query)
    let { limit, page } = req.query;
    let offset = (page - 1) * limit;
    console.log(limit)
    let query =`SELECT
    post.id as pid,
    post.caption as pcaption,
    post.link as plink,
    post.image as pimage,
    post.email as pemail,
    post.phone_no as pnumber,
    user_info.firstname as fname,
    user_info.lastnaem as lname,
    user_info.p_image as userimage

  FROM
    post
  JOIN
    user_info
  ON
    post.c_id = user_info.id   ORDER BY post.id DESC`
    if(limit && page)
    {
      const limitQuery = ` LIMIT ${limit} OFFSET ${offset}`;
      query += limitQuery;
    }


    await client.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
          console.log(req.id)
          const data ={
            id:req.id,
            role:req.role,
            result:result.rows
          }
            res.status(200).json(data)
        }
    })
  })

  router.get("/updatemypost",authenticate,async ( req ,res)=>{
    console.log(req.query)
    let { limit, page } = req.query;
    let offset = (page - 1) * limit;
    console.log(limit)
    let query =`SELECT
    post.id as pid,
    post.caption as pcaption,
    post.link as plink,
    post.image as pimage,
    post.email as pemail,
    post.phone_no as pnumber,
    user_info.firstname as fname,
    user_info.lastnaem as lname,
    user_info.p_image as userimage

  FROM
    post
  JOIN
    user_info
  ON
    post.c_id = user_info.id where user_info.id= ${req.id}  ORDER BY post.id DESC`
    if(limit && page)
    {
      const limitQuery = ` LIMIT ${limit} OFFSET ${offset}`;
      query += limitQuery;
    }


    await client.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
          console.log(req.id)
          const data ={
            id:req.id,
            role:req.role,
            result:result.rows
          }
            res.status(200).json(data)
        }
    })
  })

  router.get("/profile", async (req,res)=>{
    let { limit, page } = req.query;
    let offset = (page - 1) * limit;
    let query = `select ui.id as id,ui.firstname as firstName,
    ui.lastnaem as lastName,
    ui.p_image as image,
    ap.name as profile
     from user_info AS ui JOIN artist_profile AS ap on ui.id=ap.artistid where ui.role='artist'`
     if(limit && page)
     {
       const limitQuery = ` LIMIT ${limit} OFFSET ${offset}`;
       query += limitQuery;
     }
     await client.query(query,(err,results)=>{
      if(err){
        console.log(err)
      }
      else{
        res.status(200).send(results.rows)
      }
     })
  })

module.exports = router