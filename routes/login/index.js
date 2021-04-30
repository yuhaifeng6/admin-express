const express = require('express')
const router = express.Router()
const db = require('../../db/db')

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
            user.code = 0
            user.msg = '登录成功！'
            res.send(user)
        } else {
            res.send({
                code: -2,
                msg: "该用户不存在，请注册！"
            })
        }
    })
})

module.exports = router