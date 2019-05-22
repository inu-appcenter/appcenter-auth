const express = require('express')

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
      console.log(req.body.newPasswd)
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

module.exports = router