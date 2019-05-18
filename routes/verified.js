const express = require('express')
const router = express.Router()
const verifyQuery = require('./query/account')

router.get('/:URL',(req,res)=>{
    const url = {id : req.params.URL}
    verifyQuery(url,'verify')
    res.status(200).send('<h3>인증이 성공하였습니다.</h3>')

})

module.exports = router