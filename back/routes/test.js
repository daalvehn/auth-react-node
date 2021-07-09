const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/hash');
const db = require('../conf')
const checkAuthFields = require('../middlewares/check-fields')
const checkJwt = require('../middlewares/check-jwt')

const router = express.Router()
const isProduction = process.env.NODE_ENV === 'production'

router.get('/', (req, res) => {
  res.cookie('toto', 'titi')
  res.send('cookie')
})

router.post('/', checkAuthFields, (req, res) => {
  // récupérer le email et pssword
  const { password, email } = req.body

  // chercher dans la bdd le user dont l'email a été fourni
  db.query('SELECT * FROM user WHERE email = ?', email, (err, results) => {

const [user] = results
console.log(results)
    User.verifyPassword(password, user.password)
      .then((passwordIsCorrect) => {
        if (err) {
          console.log(err.message)
        }
        if (!passwordIsCorrect) {
          res.status(400).json({
            errors: 'invalid password'
          })
        } else {
          console.log(passwordIsCorrect)
          // res.status(200).json({})
          const { id } = user
          const payload = { id, email }
          const privateKey = process.env.JWT_SECRET

          jwt.sign(payload, privateKey, (jwterr, token) => {
            if (jwterr) {
              return res.status(500).json({
                errors: [jwterr.message]
              })
            }
            console.log('privateKey', privateKey)
            console.log('payload', payload)
            // res.json(payload)

            const options = {
              httpOnly: true,
              expiresIn: '1h',
              secure: isProduction
            }
            res.cookie('jwt', token, options)
            res.send('jwt ok').json(payload)

          });
        }
      });
  })
})

router.get('/check', checkJwt, (req, res) => {
  console.log('req', req)
  res.json(req.user)
})

module.exports = router
