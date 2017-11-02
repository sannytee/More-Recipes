
![Build Status](https://api.travis-ci.org/SannyTee/More-Recipes.svg?branch=develop) [![Coverage Status](https://coveralls.io/repos/github/SannyTee/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/SannyTee/More-Recipes?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/3e149fce348f5b0eff09/maintainability)](https://codeclimate.com/github/SannyTee/More-Recipes/maintainability)

# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a food recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Features
* Add recipe   to catalog.
* View all recipe in catalog.
* Post a review for recipe.
* Get all recipes based on most voted.



## Installation
To install this application, 
1. git clone this repository
2. Open the command line and cd into the folder you just cloned
3. Run ```npm install``` to install dependencies
4. Then run ```npm start:dev``` to start the application

## Built with
* [NodeJS](https://nodejs.org/en/) - A Javscript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.


## API
The routes currently specified in the application are as follows:

- **'api/v1/recipes'**
    - **POST** - Creates a new recipe in the catalog

- **'api/v1/recipes/:recipeId'**
    - **PUT** - Enables User to edit or update information about a recipe.
- **'api/v1/recipes'**
    - **GET** - Retrieve all recipes in catalog
- **'api/v1/recipes?sort=upvotes&order=des'**
    - **GET** - Get all recipes based on most voted.
- **'api/v1/recipes/:recipeId/reviews'**
    - **POST** - allows users to post a review for recipe  
- **'api/v1/recipes/:recipeId'**
    - **DETELE** - allows users to delete recipe    
