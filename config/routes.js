const express = require('express')

module.exports = function(server) {

	//API Routes
	const router = express.Router()
	server.use('/api', router)

	const lojaService = require('../api/lojas/lojaService')
	lojaService.register(router, '/lojas')

	const clienteService = require('../api/cliente/clienteService')
	clienteService.register(router,'/cliente')

	const pedidosService = require('../api/pedidos/pedidosService')
	pedidosService.register(router,'/pedidos')

}
