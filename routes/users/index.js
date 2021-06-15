const express = require('express')
const router = express.Router()
const db = require('../../db/db')

/** 获取用户列表 */
router.post('/getUser', (req, res) => {
    let { uid } = req.body
    let selPermission = `SELECT * FROM users WHERE uid = ${uid}`
    db.query(selPermission, [uid], (result) => {
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
                res.send({
                    code: 0,
                    data: result
                })
            })
        }
    })
})

/** 删除用户 */
router.post('/delUser', (req, res) => {
    let { uid } = req.body
    let delsql = `DELETE users, userinfo FROM users LEFT JOIN userinfo ON users.uid = userinfo.uid WHERE users.uid = ${uid}`
    db.query(delsql, [uid], (result) => {
        if (result.affectedRows == 2) {
            res.send({
                code: 0,
                msg: '删除成功！'
            })
        } else {
            res.send({
                code: -1,
                msg: '删除失败！'
            })
        }
    })  
})

/** 编辑用户 */
router.post('/editUser', (req, res) => {
    let { uid, username, sex } = req.body
    let editsql = `UPDATE users, userinfo SET users.username = '${username}', userinfo.sex = ${sex} WHERE users.uid = ${uid} AND userinfo.uid = ${uid}`
    db.query(editsql, [uid], (result) => {
        if (result.affectedRows == 2) {
            res.send({
                code: 0,
                msg: '编辑成功！'
            })
        } else {
            res.send({
                code: -1,
                msg: '编辑失败！'
            })
        }
    })
})

module.exports = router