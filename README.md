# RECIPETAP API

<hr />

## About
This repository contains the backend for RecipeTap project. RecipeTap is a small, but surely growing recipe website. It is an easy website to use, as you can simply login to parse though plently of recipes that is available for you. You can create, delete and update your own recipe as well. If you also want to support other recipe creaters, you can comment on other people's recipe ideas. The app leans a little more toward social media than it does for cooking in a lot of spots. Over all, the application has a clean and simple user interface, with that said, we hope this will be your new faviote spot to get INSPIRED and COOK!

# Technologies
<hr />

## MERN Stack
- React.js - A Frontend JavaScript library
 - Express - Backend web framework
- MongoDb - Database
 - Node.js - JavaScript runtime

# Getting Started
<hr />

## Prerequisites
- npm
`npm intall npm@latest -g`
- git tool 
the git tool is used to set up an environment to excute `git` commands, download:  [download and install the git tool.](https://git-scm.com/downloads)

## Installation 

1. git clone https://github.com/mmengi18/Recipe-App-Client.git 
1.  make sure that you are in the root dirctory of the project, use "pwd" pr "cd" for windows 
1. cd RepoName -  `Recipe-App-Client`
1. Install dependencies with `npm install`.
1.  Run the development server with `npm start`.

## Client
This API will serve it's React based client: 
Here is the Link: [github.com/Client](https://github.com/mmengi18/Recipe-App-Client/tree/main)

# Project Plan 
<hr />

## Route Table

### User route table

Verb| Route | Description |
---| ----- | ----------- |
POST| /sign-up | allows users to create a new account |
GET| /sign-in | allows users to sign into their account |
DELETE| /sign-out | allows users to sign out of their account |
PATCH| /change-password | allows users to change their password |

### Recipe route table

Verb| Route | Description |
---| ----- | ----------- |
GET| /view-all-recipes | allows user to view all recipes|
GET| /view-recipe:id | allows user to view a recipe |
POST| /create-recipe:id | allows user to create new recipe of their account |
PATCH| /edit-recipe:id | allows user to update recipe|
DELETE| /delete-recipe:id | allows user to delete recipe|

### comment route table

Verb| Route | Description |
---| ----- | ----------- |
POST| /create-comment:id | allows user to create new comment|
PATCH| /edit-comment:id | allows user to update comment|
DELETE| /delete-comment:id | allows user to delete comment|


## ERD

<img width="707" alt="ERD" src="https://user-images.githubusercontent.com/89544636/185941281-91df9724-52d7-4f46-9a61-415e06e89287.png">



## Technology Used Links

React - [reactjs.com](https://reactjs.org/)
Express JS - [expressjs.com](https://reactjs.org/)
Node JS - [nodejs.com](https://nodejs.org/en/)
Mongoose JS - [mongoosejs](https://mongoosejs.com/)
MongoDB - [mongodb](https://www.mongodb.com/)
NPM JS - [npmjs](https://www.npmjs.com/)








