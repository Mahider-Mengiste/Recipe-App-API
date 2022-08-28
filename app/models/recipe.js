// Recipe -> have an owner, that is a user
// eventually we'll add an array of toy subdocuments

const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

// import comment sub document to recipe schema
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const recipeSchema = new Schema(
    {
        recipeCreator: {
            type: String,
            required: true

            
        },
        // String type
        recipeName: {
            type: String,
            required: true
        },
        // String type
        recipeType: {
            type: String,
            required: true
        },
        image: {
			type: String,
			required: true
		},
        comments: [commentSchema],
        likes: [{type:ObjectId,ref:"User"}],
        // String type
        Ingredient: {
         	type: String,
            required: true
        },
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
    }, {
        timestamps: true,
    }
)

module.exports = model('Recipe', recipeSchema)