const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Recipe = require('../models/recipe')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// POST - /create-comment/recipe_id - create comment
router.post('/create-comment/:recipeId', requireToken, (req, res, next) => {
    // get our comment from req.body
    const comment = req.body.comment
    comment.owner = req.user.id
    comment.email = req.user.email
    // get the recipe id from params
    const recipeId = req.params.recipeId
    // find the recipe
    Recipe.findById(recipeId)
        .then(handle404)
        .then((recipe) => {
            console.log('this is the recipe', recipe)
            console.log('this is the comment', comment)
            // push comment in recipe's comment array
            recipe.comments.push(comment)
            // save recipe
            return recipe.save()
        })
        // send the newly updated recipe as JSON
        .then(recipe => res.status(201).json({ recipe: recipe }))
        // handle error
        .catch(next)
})

// PATCH - /edit-comment/recipeId/comment_id - edit comment, must be owned by signed in user
router.patch('/edit-comment/:recipeId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    // get recipe and comment ids saved to variables
    const recipeId = req.params.recipeId
    const commentId = req.params.commentId
    // find the recipe
    Recipe.findById(recipeId)
        .then(handle404)
        .then(recipe => {
            // single out the comment
            const theComment = recipe.comments.id(commentId)
            // make sure the user sending request is the owner of the comment
            requireOwnership(req, theComment)
            // update comment with subdocument method
            theComment.set(req.body.comment)
            // return saved recipe
            return recipe.save()
        })
        .then(() => res.sendStatus(204))
        // handle error
        .catch(next)
})

// DELETE - /delete-comment/recipe_id/comment_id
router.delete('/delete-comment/:recipeId/:commentId', requireToken, (req, res, next) => {
    // save ids to variables
    const recipeId = req.params.recipeId
    const commentId = req.params.commentId
    // find recipe
    Recipe.findById(recipeId)
    // handle 404
        .then(handle404)
    // delete comment from recipe's comment array
        .then(recipe => {
            // can get subdoc the same way as update
            const theComment = recipe.comments.id(commentId)
            // make sure the user deleting toy is the owner
            requireOwnership(req, theComment)
            // call remove with subdocument method
            theComment.remove()
            // return saved recipe
            return recipe.save()
        })
        .then(() => res.sendStatus(204))
    // handle errors
        .catch(next)
})

// export router
module.exports = router