const express = require('express')
const randomString = require('randomstring')

const accountQuery = require('./query/account')

const router = express.Router()

router.post('/',async (req,res)=>{
    let query={
        id : req.body.id,
        passwd : req.body.passwd,
        newPasswd : req.body.newPasswd,
        tel : req.body.tel,
        major : req.body.major,
        name : req.body.name,
        type : 1
      }
      let answer
      if(req.body.newPasswd == ""){
          answer = await accountQuery(query,'changeInfo')
      }
      else{
          answer = await accountQuery(query,'changeAll')
      }

      if(!answer){
          res.status(400).json({ans : "password"})
      }else{
          res.status(200).json({ans : "success"})
      }
})

router.post('/tmpPasswd',async (req,res) => {
    const newPasswd = randomString.generate(7)
    let query = {
        id : req.body.id,
        name : req.body.name,
        tmpPasswd : newPasswd
    }

    const answer = await accountQuery(query,'tmpPasswd')
    if(answer){
        res.status(200).json({ans:"success"})
    }
    else{
        res.status(400).json({ans:"err"})
    }
})

module.exports = router