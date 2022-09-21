'use strict'

// creating a base name for the mongodb
// REPLACE THE STRING WITH YOUR OWN DATABASE NAME
const mongooseBaseName = 'recipe-app-database'

// create the mongodb uri for development and test
const database = {
	development: `mongodb://127.0.01/${mongooseBaseName}-development`,
	test: `mongodb://127.0.01/${mongooseBaseName}-test`,
}

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.MONGODB_URI || localDb

// mongodb+srv://mahider12345:mahider12345@recipetap-api.wwgnfkd.mongodb.net/recipetap?retryWrites=true&w=majority

module.exports = currentDb
