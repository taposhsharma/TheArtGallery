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
  
router.get("/updateprofile",async ( req ,res)=>{
     
     
     const query = `  SELECT ap.*,ap.artistid as artistId, w.id as image_id,w.description,w.image,w.name as imageName    FROM artist_profile AS ap LEFT
     JOIN work AS w ON ap.artistid = w.artistid
     WHERE ap.artistId = $1`

     client.query(query,[req.id],(err,results)=>{
      if(err){
        console.log(err)
      }else{
        //console.log(results.rows)
        res.status(200).send(results.rows)
      }
     })

})




// update profile data 

router.post("/updateprofile",upload.array('images'),async (req,res)=>{
  const files = req.files;
  const { name, about, achievements,image_id, imageNames, aboutImages } = JSON.parse(req.body.data);
 try{
  const query ='update artist_profile set name = $1 ,about=$2,achievement =$3 where artistId =$4 returning id'
  const updatedValues = [name, about, achievements,req.id]
  const results = await client.query(query,updatedValues)
  console.log(files)
  if(results.rows.length>0){
    for(let i=0;i<files.length;i++){
      if(files[i].originalname=='no-image.txt'){
        if(image_id[i]==0){
          const insertWorkQuery = 'INSERT INTO work (name, description, artistId) VALUES ($1, $2, $3, $4)';
          const workValues = [imageNames[i], aboutImages[i],req.id];
          await client.query(insertWorkQuery, workValues);
        }else{
          const updateQuery ='update work set name=$1,description=$2 where id=$3'
          const updatedValues=[imageNames[i],aboutImages[i],image_id[i]]
          await client.query(updateQuery,updatedValues)
        }
      }else{
        const file = files[i];
        const imageBuffer = fs.readFileSync(file.path);
        console.log(image_id[i])
        if(image_id[i]==0){
          const insertWorkQuery = 'INSERT INTO work (name, description, artistId, image) VALUES ($1, $2, $3, $4)';
          const workValues = [imageNames[i], aboutImages[i], req.id, imageBuffer];
          client.query(insertWorkQuery, workValues);
        }else{
          const updateQuery ='update work set name=$1,description=$2 ,image=$3 where id=$4'
          const updatedValues=[imageNames[i],aboutImages[i],imageBuffer,image_id[i]]
          await client.query(updateQuery,updatedValues)
        }
      }
    }
    client.query('COMMIT');
    res.status(200).send("Profile Updated");
  }
 }catch(err){
  await client.query('ROLLBACK');
  console.error(err);
  res.status(500).send("Error while submitting the profile");
 }
  // const query ='update artist_profile set name = $1 "about"=$2,achievemnt =$3 where artistId =$4 '
  // const updatedValues = [name, about, achievements,req.id]
  // await client.query(query,updatedValues,(err,res))
  // console.log(req.body.data)
  
     
})

router.get("/check",async ( req ,res)=>{
  return res.status(200).send("authorized")
})
module.exports = router