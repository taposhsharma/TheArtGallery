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
  
  router.get("/check",authenticate,async ( req ,res)=>{
    return res.status(200).send("authorized")
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
module.exports = router