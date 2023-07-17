const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const db = require('./connection/db')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(require("./routes/user"))
app.use("/artist",require("./routes/artist"))
app.use("/post",require("./routes/post"))
const bodyParser = require('body-parser')
const PORT= 5000
app.listen(PORT,console.log(`Server is running at Port----> ${PORT}`))