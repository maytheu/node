const {Router} = require('express')
const { getAllplanets } = require('./planets.controller')

const planetRouter = Router()

planetRouter.get('/planets', getAllplanets)

module.exports=planetRouter