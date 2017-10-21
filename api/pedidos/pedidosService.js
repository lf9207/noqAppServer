const _ = require('lodash')
const Pedidos = require('./pedidos')

Pedidos.methods(['get', 'post', 'put', 'delete'])
Pedidos.updateOptions({new: true, runValidators: true})

Pedidos.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
	const bundle = res.locals.bundle

	if(bundle.errors) {
		var errors = parseErrors(bundle.errors)
		res.status(500).json({errors})
	} else {
		next()
	}
}

function parseErrors(nodeRestfullErrors) {
	const errors = []
	_.forIn(nodeRestfullErrors, error => errors.push(error.message))
	return errors
}

//conta lojas no banco //provavelmente não vai continuar aqui
Pedidos.route('count', function(req, res, next) {
	Pedidos.count(function(error, value) {
		if(error){
			res.status(500).json({errors: [error]})
		} else {
			res.json({value})
		}
	})
})


module.exports = Pedidos
