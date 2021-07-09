const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/hash')
const db = require('../conf')
const checkAuthFields = require('../middlewares/check-fields')
const checkJwt = require('../middlewares/check-jwt')

const router = express.Router()
const isProduction = process.env.NODE_ENV === 'production'

require('dotenv').config()

router.post('/', checkAuthFields, (req, res) => {
  const { password, email } = req.body

  db.query('SELECT * FROM user WHERE email = ?', email, (err, results) => {

const [user] = results

    User.verifyPassword(password, user.password, (err))
      .then((passwordIsCorrect) => {
        if (err) {
          console.log(err.message)
        }
        if (!passwordIsCorrect) {
          res.status(400).json({
            errors: 'invalid password'
          })
        } else {
          // res.status(200).json({})
          const { id } = user
          const payload = { id, email }
          const privateKey = process.env.JWT_SECRET


          jwt.sign(
            { payload },
            privateKey,
            (jwterr, token) => {
              if (jwterr) {
                return res.status(500).json({
                  errors: [jwterr.message]
                })
              }
              const options = {
                httpOnly: true,
                expiresIn: '1h',
                secure: isProduction
              }
              res.cookie('jwt', token, options)
              res.json({ payload })
            }
          );
        }
      })
  })
})

router.get('/check', checkJwt, (req, res) => {
  res.json(req.user)
})

module.exports = router
