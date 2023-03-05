const express = require('express')
const router = express.Router()
const menuRoutes = require('../domains/menu')

router.use('/order', menuRoutes)

router.get('/', (req, res) => {
  res.status(200).send("Welcome to Order App!")
})

module.exports = router