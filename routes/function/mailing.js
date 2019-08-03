const config = require('../config/config')

module.exports = async function(createUser,url,whatKind){
    const nodemailer = require('nodemailer')
    const smtpTransport = require('nodemailer-smtp-transport')

    let transporter = nodemailer.createTransport(smtpTransport({
        service:'gmail',
        auth: {
            user:config.mailId,
            pass:config.mailPasswd
        }
    }))


    let mailOptions = {
        from:"Do Not reply<user@gmail.com>",
        to:createUser,
        subject:"INU APP Center 계정 인증메일입니다.",
        text:"다음 링크를 클릭하시고 인증을 완료해주세요 "+config.verifyPath+url
    }

    let passwordMailOptions = {
        from : "Do Not Reply <user@gmail.com>",
        to:createUser,
        subject:"INU APP Center에서 전송된 임시 비밀번호입니다",
        text : "새로 변경된 비밀번호는 "+url+"입니다 로그인후 필히 비밀번호를 변경해주시기 바랍니다."
    }

    if(whatKind == "account"){
        transporter.sendMail(mailOptions,function(err,response){
            if(err){
                console.error(err)
            }
            else {
                console.log(`create Message sent : + ${createUser}`)
            }
            transporter.close()
        })
    }
    else if(whatKind == "passwd"){
        transporter.sendMail(passwordMailOptions,function(err,response){
            if(err){
                console.error(err)
            }
            else {
                console.log(`tmpPasswd Message sent : + ${createUser}`)
            }
            transporter.close()
        })
    }
    else return false
    
}