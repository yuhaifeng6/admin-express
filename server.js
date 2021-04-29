const express = require('express')
const app = express()
const cors = require('cors')

// body 解析 post参数
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

//处理跨域
app.use(cors())
// 跨域问题解决方面
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  　next()
})

const routes = require('./routes/index')(app)

app.listen(3004, () => {
    console.log('server started successfully')
})