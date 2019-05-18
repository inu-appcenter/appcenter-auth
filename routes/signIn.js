const express = require('express')
const router = express.Router()
const loginQuery = require('./query/account')

router.get('/',(req,res)=>{
  res.send(true)
})

router.post('/',async(req,res)=>{
  let query={
    id : req.body.id,
    passwd : req.body.passwd
  }
  if(loginQuery(query,'checkId')){
    let answerLogin = await loginQuery(query,'signIn')
    if(!answerLogin){
      res.status(400).json({ans:'password'})
    }
    else{
      if(answerLogin === "certification"){
        res.status(400).json({ans:'certification'})
      }else{
        res.status(200).json({token : answerLogin})
      }
    }  
  }
  else{
    res.status(400).json({ans:"Id"})
  }
  
  
})



module.exports = router