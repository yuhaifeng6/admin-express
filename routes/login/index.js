const express = require('express')
const router = express.Router()
const db = require('../../db/db')
const tokenUtil = require('../../utils/token')

router.post('/login', function (req, res) {
    var { username, userpwd } = req.body
    if (!username || !userpwd) { // 不传用户名或者密码情况
        res.send({
            code: -1,
            msg: "用户名与密码为必传参数..."
        })
        return
    }

    let sql = `SELECT * FROM users WHERE username = '${username}' AND userpwd = '${userpwd}'`

    db.query(sql, [username, userpwd], function(results) {
        if (results.length > 0) {
            let user = results[0]
            delete user.userpwd
            user.code = 0
            user.msg = '登录成功！'
            tokenUtil.setToken(user.uid, username, userpwd)
                .then(token => {
                    user.token = token
                    res.send(user)
                })
                .catch(err => console.log('generate token fail...', err))
        } else {
            res.send({
                code: -2,
                msg: "该用户不存在，请注册！"
            })
        }
    })
})

module.exports = router