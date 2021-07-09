const express = require('express');
const User = require('../models/hash')
const db = require('../conf')
const checkAuthFields = require('../middlewares/check-fields')

const router = express.Router();


router.post('/', checkAuthFields, (req, res) => {
  const { email, password } = req.body
  User.hashPassword(password).then((hashedPassword) => {
    console.log(email, password)

    const newUser = {
      email,
      password: hashedPassword
    }

    db.query('INSERT INTO user SET ?', newUser, (err, result) => {
      if (err) {
        return res.status(500).json({
          errors: [err.message]
        })
      }
      res.status(201).json({
        id: result.insertId,
        email,
        password: hashedPassword
      })
    })
  })
})

module.exports = router
