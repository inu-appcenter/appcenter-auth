const jwt = require('jsonwebtoken')
const secret = require('../config/config')["jwt-secret"]

module.exports = (query)=>{
    const p = new Promise((resolve,reject) => {
        jwt.sign(
            {
            id : query.id,
            name : query.name,
            major : query.major,
            tel : query.tel,
            type : query.type
        },
        secret,
        {
            expiresIn : '30d',
            subject : 'userInfo'
        },
        (err,token) => {
            if(err) reject (err)
            resolve(token) 
        }
        )
    }) 
    return p
}