const express = require('express')
const router = express.Router()
const db = require('../../db/db')

/** 获取用户列表 */
router.post('/getUser', (req, res) => {
    let { uid } = req.body
    let selPermission = `SELECT * FROM users WHERE uid = ${uid}`
    db.query(selPermission, [uid], (result) => {
        console.log('输出结果', result)
        let permissionid = result[0].permissionid
        if (parseInt(permissionid) > 2) {
            res.send({
                code: -1,
                msg: '您无权操作！'
            })
            return
        } else {
            // 查询所有的普通用户
            let selNormalUsers = `SELECT * FROM users, userinfo WHERE permissionid = 3
                                AND users.uid = userinfo.uid`
            db.query(selNormalUsers, [], (result) => {
                console.log('输出所有的普通用户', result)
                res.send({
                    code: 0,
                    data: result
                })
            })
        }
    })
})

module.exports = router