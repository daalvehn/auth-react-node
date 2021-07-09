const checkAuthFields = (req, res, next) => {
const { email, password } = req.body

  if (!email || !password) {
    res.status(422).json({
      errorMessage: 'One field is missing'
    })
  }
  return next()
}

module.exports = checkAuthFields
