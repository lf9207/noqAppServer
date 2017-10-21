const _ = require('lodash')
const Cliente = require('./cliente')

Cliente.methods(['get', 'post', 'put', 'delete'])
Cliente.updateOptions({new: true, runValidators: true})

Cliente.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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
Cliente.route('count', function(req, res, next) {
	Cliente.count(function(error, value) {
		if(error){
			res.status(500).json({errors: [error]})
		} else {
			res.json({value})
		}
	})
})


module.exports = Cliente
