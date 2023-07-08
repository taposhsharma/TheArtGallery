const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const db = require('./connection/db')
app.use(express.json())
const PORT= 5000
app.listen(PORT,console.log(`Server is running at Port----> ${PORT}`))