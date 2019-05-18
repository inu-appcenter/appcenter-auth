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
  let answerLogin = await loginQuery(query,'signIn')
  res
  .status(200)
  .json({token : answerLogin})
})



module.exports = router