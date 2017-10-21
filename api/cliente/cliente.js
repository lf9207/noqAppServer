const restful = require('node-restful')
const mongoose = restful.mongoose

const  clienteSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true },
  senha: { type: String, required: true },
})

module.exports = restful.model('Cliente',clienteSchema)
