
const jwt = require('jsonwebtoken')
const util = require('util')

const signToken = util.promisify(jwt.sign)
const verifyToken = util.promisify(jwt.verify)

const tokenSecret = "hmshmshmshmshmshms"

const sign = (userId) => {
   return signToken({userId:userId}, tokenSecret )
}

const verify = (token) => {
  return verifyToken(token , tokenSecret) 
}

module.exports = {
    sign,verify
}