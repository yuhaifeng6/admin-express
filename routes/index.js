
module.exports = (app, database) => {
    let login = require('./login/index')
    app.use(login)
}