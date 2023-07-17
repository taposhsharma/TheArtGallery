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

  router.post("/createPost", upload.array("images"), async (req, res) => {
    const files = req.files;
    console.log(files)
    const {caption,email,phoneNumber,link} = JSON.parse(req.body.data);
    const imageBuffer = null
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
      res.status(200).send("Profile Submitted");
    
     
    
   
      
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).send("Error while submitting the profile");
    } 
  });
  

router.get("/check",async ( req ,res)=>{
     return res.status(200).send("authorized")
})

router.get("/data", async (req,res)=>{
  const query ='select * from artist_profile'
  await client.query(query,(err,results)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(results)
      console.log(results)
    }
  })
})

module.exports = router