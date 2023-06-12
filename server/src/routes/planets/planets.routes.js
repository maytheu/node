const {Router} = require('express')
const { getAllplanets } = require('./planets.controller')

const planetRouter = Router()

planetRouter.get('/', getAllplanets)

module.exports=planetRouter