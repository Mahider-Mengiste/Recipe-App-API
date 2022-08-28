// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for recipes
const Recipe = require('../models/recipe')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /view-all-recipes
router.get('/view-all-recipes', (req, res, next) => {
	// we want everyone to see the recipes, whether they're logged in or not.
	// if we wanted to protect these resources, then we can add that middleware back in. and we would place it between the route and the callback function.(second argument)
	console.log(Recipe.find())
	Recipe.find()
		.populate('owner')
		.then((recipes) => {
			console.log('the whole request', req)
			// `recipes` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return recipes.map((recipe) => recipe.toObject())
		})
		// respond with status 200 and JSON of the recipes
		.then((recipes) => res.status(200).json({ recipes: recipes }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /view-recipe/:id
router.get('/view-recipe/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	// console.log(mongoose.Types.ObjectId.isValid(id))
	Recipe.findById(req.params.id)
		.populate('owner')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "recipe" JSON
		.then((recipe) => res.status(200).json({ recipe: recipe.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /create-recipe
router.post('/create-recipe', requireToken, (req, res, next) => {
	// set owner of new recipe to be current user
	req.body.recipe.owner = req.user.id
	console.log("this is ---------------", req.body.Recipe)
	Recipe.create(req.body.recipe)
		// respond to succesful `create` with status 201 and JSON of new "recipe"
		.then((recipe) => {
			res.status(201).json({ recipe: recipe.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /edit-recipe/:id
router.patch('/edit-recipe/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.recipe.owner

	Recipe.findById(req.params.id)
		.then(handle404)
		.then((recipe) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, recipe)

			// pass the result of Mongoose's `.update` to the next `.then`
			return recipe.updateOne(req.body.recipe)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /delete-recipe/:id
router.delete('/delete-recipe/:id', requireToken, (req, res, next) => {
	Recipe.findById(req.params.id)
		.then(handle404)
		.then((recipe) => {
			// throw an error if current user doesn't own `recipe`
			requireOwnership(req, recipe)
			// delete the recipe ONLY IF the above didn't throw
			recipe.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// //like / dislike a recipe
// router.put("/:id/like", async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe.likes.includes(req.body.userId)) {
//       await recipe.updateOne({ $push: { likes: req.body.owner } });
//       res.status(200).json("The post has been liked");
//     } else {
//       await recipe.updateOne({ $pull: { likes: req.body.owner } });
//       res.status(200).json("The post has been disliked");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router
