const express = require('express')
const accountQuery = require('./query/account')
const router = express.Router()

router.post('/',async(req,res)=>{
  let query={
    id : req.body.id,
    passwd : req.body.passwd,
    tel : req.body.tel,
    major : req.body.major,
    name : req.body.name,
    type : 1
  }
  if(await accountQuery(query,'checkId')){
    if(await accountQuery(query,'singUp')){
      res.status(200).json({answer:"success"})
    }
    else{
      res.status(400).json({answer:"fail"})
    }
  }
  else{
    res.status(400).json({answer:"Id"})
  }
  //res.status(200).send(true)
})



module.exports = router