const restful = require('node-restful')
const mongoose = restful.mongoose

const pedidoSchema = new mongoose.Schema({
	numero: { type: Number, required: true },
	status: { type: String, required: true, upppercase: true,
		enum: ['PENDENTE', 'EM_ANDAMENTO', 'PRONTO', 'FINALIZADO'] },
		//o que pode ser aceito no atributo status
	itens: [ { nome: String } ]
})

module.exports = restful.model('Pedidos', pedidoSchema)
