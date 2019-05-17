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
  if(accountQuery(query,'checkId')){
    await accountQuery(query,'singUp')
  }
  res.send(true)
})



module.exports = router