const _ = require('lodash')
const Lojas = require('./lojas')

Lojas.methods(['get', 'post', 'put', 'delete'])
Lojas.updateOptions({new: true, runValidators: true})

Lojas.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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
Lojas.route('count', function(req, res, next) {
	Lojas.count(function(error, value) {
		if(error){
			res.status(500).json({errors: [error]})
		} else {
			res.json({value})
		}
	})
})


module.exports = Lojas
