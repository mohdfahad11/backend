import bodyParser from 'body-parser'
import express from 'express'
import routes from './src/Routes/routes.js'
import * as dotenv from 'dotenv'
import corsPkg from 'cors'

dotenv.config()

// Patch: https://github.com/prisma/studio/issues/614#issuecomment-795213237
BigInt.prototype.toJSON = function () {
  return this.toString()
}

const cors = corsPkg

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);
app.use(express.static('public'))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    message: "No such route exists"
  })
});

// catches unhandled exceptions
process.on('uncaughtException', (err) => {
  console.log(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

app.listen(process.env.PORT || 3000)
// app.listen(3000, '0.0.0.0'); server will be hosted on ip address of the m/c port 3000
