const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const client = require('../connection/db')
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const customizeUser = require('./usermail')

const upload = multer({dest: "uploads/",
    limits: {
      fieldSize: 50 * 1024 * 1024 // 10MB
    }
  });

  const authenticate = require('../verifyToken');
const customizeMess = require('./mailservice');
  
  router.get("/check",authenticate,async ( req ,res)=>{
    return res.status(200).send("authorized")
  })

  router.get("/user",authenticate, async (req,res)=>
  {
    const query = `select address,firstname,lastnaem,mobile_no,p_image,email from user_info where id =${req.id}`
    await client.query(query,(err,results)=>{
      if(err){
        console.log(err)

      }else{
        res.status(200).send(results.rows)
      }
    })
  })


  router.post('/login', (req, res) => {

    const { email,password } = req.body;
 
    client.query(`SELECT * FROM user_info WHERE email='${email}'`, (error, results) => {
      if (error) {
        console.log(error)
        
        
      }
      else if(results.rowCount>0){
      
      if(results.rows[0].password===password){
      
        const token = jwt.sign({email:email,role:results.rows[0].role,id:results.rows[0].id},process.env.SECRET_KEY)
        const user = {
         
          token:token
        };
        console.log(results.rows)
        res.status(200).json({user: user});
      }
      else{
        res.status(200).json({user:1})
      }
      
    }
    else{
      console.log(results)
      res.status(200).json({user:0})
    }
    
    });
  });


router.post("/signup", upload.array("images[]"), async(req,res)=>{
     let imageBuffer = null
         const data = JSON.parse(req.body.info)
         const files = req.files
    try{
        
        
        if(files.length>0){
           
            const file = files[0];
            // console.log(file)
            // console.log(file.path)
            imageBuffer = fs.readFileSync(file.path);
           
            // console.log("data:", data)
            // console.log(imageBuffer)
        }
           
            const insertQuery = "INSERT INTO user_info (email,firstname,lastnaem,role,address,mobile_no,password,p_image ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING id"
            const { rows } = await client.query(insertQuery, [data.email,data.firstName,data.lastName,data.role,data.address,data.mobile_no,data.password,imageBuffer]); 
            console.log(rows)
            await client.query("COMMIT"); 
            customizeUser(data.email)       
          return res.status(200).send("okk")
    }catch(err){
        await client.query("ROLLBACK");
      if(err.detail==`Key (email)=(${data.email}) already exists.`){
        res.status(500).json({mess:"Email already exists"})
      }
      else{
        console.log(err)
        res.status(500).json({mess:"Problem while signup"})
      }
    }
})
router.get("/display",(req,res)=>{
    try{
        const query = "select * from user_info"
        client.query(query,(error,result)=>{
            if(error){
                console.log(error)

            }else{
                res.send(result.rows)
            }
        })
    }
    catch{

    }
})

router.get("/data/:id", async (req,res)=>{
  const id = req.params.id
  const query = ` SELECT
  ap.*,
  ap.artistid AS artistId,
  ui.firstname AS artistFirstName,
  ui.lastnaem as artistLastName,
  ui.p_image AS artistPic,
  w.id AS image_id,
  w.description,
  w.image,
  w.name AS imageName
FROM
  artist_profile AS ap
LEFT JOIN
  work AS w ON ap.artistid = w.artistid
LEFT JOIN
  user_info AS ui ON ap.artistid = ui.id
WHERE
  ap.artistId = $1;
`
  client.query(query,[id],(err,results)=>{
    if(err){
      console.log(err)
    }else{
      //console.log(results.rows)
      res.status(200).send(results.rows)
    }
   })
})


router.post('/update' ,authenticate, upload.array("images[]"), async (req,res)=>{
  const files = req.files;
  console.log(files)
  console.log(req.body.info)
  const {email,firstName,lastName,address,mobile_no,password} = JSON.parse(req.body.info)
  console.log(email)
  // const {id,caption,email,phoneNumber,link} = JSON.parse(req.body.data);
  let imageBuffer = null
  try {
      await client.query('BEGIN');
   
     if(files.length>0){
  
      for (let i = 0; i < files.length; i++) {
        const file = files[0];
        imageBuffer = fs.readFileSync(file.path);
        const insertQuery = 'UPDATE user_info SET email = $1, firstname = $2,lastnaem = $3,address = $4, mobile_no= $5 ,p_image=$6 WHERE id = $7;';
        const postValues = [email,firstName,lastName,address,mobile_no,imageBuffer,req.id];
        client.query(insertQuery, postValues);
        client.query('COMMIT');
        res.status(200).send("Post Submitted");
        
      }}
  else{
      const insertQuery = 'UPDATE user_info SET email = $1, firstname = $2,lastnaem = $3,address = $4, mobile_no= $5 WHERE id = $6;';
        const postValues = [email,firstName,lastName,address,mobile_no,req.id];
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



router.post("/connect",authenticate,async(req,res)=>{
  console.log(req.body)
  console.log(req.id)
  const query = `SELECT firtsname,lastnaem, email,mobile_no from user_info where id = ${req.id}`
  client.query(query,(err,results)=>{
    if(err){
      console.log(err)
    }else{
      const query = `SELECT email from user_info where id = ${req.body.id}`
      client.query(query,(err,result)=>{
        if(err){
          console.log(err)
        }else{
            console.log(results.rows)
            console.log(result.rows)
           const mess =  customizeMess(results.rows[0],result.rows[0].email)
           res.status(200).send("Email Sent")
        }
      })
    }
  })
})
module.exports = router