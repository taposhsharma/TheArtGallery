const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const client = require('../connection/db')
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const authenticate = require('../verifyToken')
router.use(authenticate)
const upload = multer({dest: "uploads/",
    limits: {
      fieldSize: 50 * 1024 * 1024 // 10MB
    }
  });
// cretae post for event details 
  router.post("/createPost", upload.array("images[]"), async (req, res) => {
    const files = req.files;
    console.log(files)
    const {caption,email,phoneNumber,link} = JSON.parse(req.body.data);
    let imageBuffer = null
    try {
      await client.query('BEGIN');
   
     
  
      for (let i = 0; i < files.length; i++) {
        const file = files[0];
        imageBuffer = fs.readFileSync(file.path);
  
        
      }
      const insertQuery = 'INSERT INTO post (caption,link,image,c_id,email,phone_no) VALUES ($1, $2, $3, $4,$5,$6)';
      const postValues = [caption,link,imageBuffer,req.id,email,phoneNumber];
      client.query(insertQuery, postValues);
      client.query('COMMIT');
      res.status(200).send("Post Submitted");
    
     
    
   
      
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).send("Error while submitting the post");
    } 
  });
  
// check for authorization (primary check point)
router.get("/check",async ( req ,res)=>{
     return res.status(200).send("authorized")
})

// router.get("/data", async (req,res)=>{
//   const query ='select * from artist_profile'
//   await client.query(query,(err,results)=>{
//     if(err){
//       console.log(err)
//     }
//     else{
//       res.send(results)
//       console.log(results)
//     }
//   })
// })



// get data for update the post for event 
router.get("/updatepost/:id",async (req,res)=>{
    const id = req.params.id
    // console.log(id)
    const query = `select * from post where id = ${id}`
    await client.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            // console.log(result.rows)
            res.status(200).send(result.rows)
        }
    })
})



// post request to update the data in the post table 

router.post('/updatepost' , upload.array("images[]"), async (req,res)=>{
    const files = req.files;
    console.log(files)
    const {id,caption,email,phoneNumber,link} = JSON.parse(req.body.data);
    let imageBuffer = null
    try {
        await client.query('BEGIN');
     
       if(files.length>0){
    
        for (let i = 0; i < files.length; i++) {
          const file = files[0];
          imageBuffer = fs.readFileSync(file.path);
          const insertQuery = 'UPDATE post SET caption = $1, link = $2,image = $3,c_id = $4,email = $5, phone_no = $6 WHERE id = $7;';
          const postValues = [caption,link,imageBuffer,req.id,email,phoneNumber,id];
          client.query(insertQuery, postValues);
          client.query('COMMIT');
          res.status(200).send("Post Submitted");
          
        }}
    else{
        const insertQuery = 'UPDATE post SET caption = $1, link = $2,c_id = $3,email = $4, phone_no = $5 WHERE id = $6;';
          const postValues = [caption,link,req.id,email,phoneNumber,id];
          client.query(insertQuery, postValues);
          client.query('COMMIT');
          res.status(200).send("Post Submitted");
    }}
        catch(err) {
            await client.query('ROLLBACK');
            console.error(err);
            res.status(500).send("Error while updating the post");
          } 
})
module.exports = router