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

    db.query('SELECT * from users', [], function(results) {
        var jsonResult
        results.forEach(val => {
            if (val.username == username && val.userpwd == userpwd) {
                jsonResult = val
            }
        })
        res.json(jsonResult)
    })
})

module.exports = router