var jwt = require('jsonwebtoken')
var signkey = 'yhf1997'

var expiresIn = {
    expiresIn: 3600 * 24 * 1
}

exports.setToken = function(userid, username, userpwd){
	return new Promise((resolve, reject)=>{
		const token = 'Bearer ' + jwt.sign({
			userid: userid,
			username: username,
			userpwd: userpwd
		}, signkey, expiresIn)
		resolve(token)
	})
}

exports.verToken = function(token){
	return new Promise((resolve,reject)=>{
		var info = jwt.verify(token, signkey, (error,res) => { 
			var data = {}
			if (error) {
				data.code = '-1'
				data.obj = error
			} else {
				data.code = '0'
				data.obj = res
			}
			return data
          });
		resolve(info)
	})
}
