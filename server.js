const express = require('express')
const app = express()
const cors = require('cors')
const expressJwt = require('express-jwt')
const tokenUtil = require('./utils/token')

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

// 解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['Authorization'];
  if (token == undefined) {
    return next();
  } else {
    tokenUtil.verToken(token).then((data)=> {
      req.data = data;
      return next();
    }).catch((error)=>{
      return next();
    })
  }
});

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
  secret: 'yhf1997',
  algorithms: ['HS256']
}).unless({
  path: ['/login']//除了这个地址，其他的URL都需要验证
}));

//当token失效返回提示信息
app.use(function(err, req, res, next) {
  if (err.status == 401) {
    return res.status(401).send('token失效');
  }
});

const routes = require('./routes/index')(app)

app.listen(3004, () => {
    console.log('server started successfully')
})