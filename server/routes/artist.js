const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const client = require('../connection/db')
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const authenticate = require('../artistTokenVerification')
router.use(authenticate)
const upload = multer({dest: "uploads/",
    limits: {
      fieldSize: 50 * 1024 * 1024 // 10MB
    }
  });

  router.post("/createprofile", upload.array("images"), async (req, res) => {
    const files = req.files;
    const { name, about, achievements, imageNames, aboutImages } = JSON.parse(req.body.data);
    try {
      await client.query('BEGIN');
     await client.query( `select * from artist_profile where artistId = ${req.id}`,(err,results)=>{
      if(err){
        console.log(err)
      }
      else if(results.rowCount>0){
       
        res.status(200).json({user:0})
      
    }else{
      const insertProfileQuery = 'INSERT INTO artist_profile (name, "about", achievement, artistId) VALUES ($1, $2, $3, $4)';
      const profileValues = [name, about, achievements, req.id];
      client.query(insertProfileQuery, profileValues);
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageBuffer = fs.readFileSync(file.path);
  
        const insertWorkQuery = 'INSERT INTO work (name, description, artistId, image) VALUES ($1, $2, $3, $4)';
        const workValues = [imageNames[i], aboutImages[i], req.id, imageBuffer];
        client.query(insertWorkQuery, workValues);
      }
      client.query('COMMIT');
      res.status(200).send("Profile Submitted");
    }
     })
    
   
      
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