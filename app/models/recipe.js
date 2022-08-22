// Recipe -> have an owner, that is a user
// eventually we'll add an array of toy subdocuments

const mongoose = require('mongoose')

// import comment sub document to recipe schema
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const recipeSchema = new Schema(
    {
        // String type
        recipeName: {
            type: String,
            required: true
        },
        // String type
        image: {
			type: String,
			required: true
		},
        comments: [commentSchema],
        // String type
        description: {
         	type: String,
            required: true
        }
    }, {
        timestamps: true,
    }
)

module.exports = model('Recipe', recipeSchema)