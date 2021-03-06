const express = require('express')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const signIn = require('./routes/signIn')
const signUp = require('./routes/signUp')
const verified = require('./routes/verified')
const changeInfo = require('./routes/change')

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/',index)
app.use('/signIn',signIn)
app.use('/signUp',signUp)
app.use('/verified',verified)
app.use('/changeInfo',changeInfo)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.get('/',(req,res)=> res.send("hello world"))

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err)
})

app.listen(1337, () => console.log('INU Appcenter Account Server is running'))
//exports.app = functions.https.onRequest(app)