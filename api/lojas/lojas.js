	const restful = require('node-restful')
	const mongoose = restful.mongoose

const produtoSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	descricao: { type: String, required: true },
	img: { type: String, required: true },
	preco: { type: Number, min: 0, required: true },
	tempoMedio: { type: String}
})

const lojaSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	imagem: { type: String, required:true },
	email: { type: String, required: true },
	produtos: [produtoSchema]
})

module.exports = restful.model('Lojas', lojaSchema)
