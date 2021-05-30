
module.exports = (app, database) => {
    let login = require('./login/index') // 登录
    let user = require('./users/index') // 用户增删改查

    app.use(login)
    app.use(user)
}