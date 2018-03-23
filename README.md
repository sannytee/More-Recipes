
![Build Status](https://api.travis-ci.org/SannyTee/More-Recipes.svg?branch=develop) [![Coverage Status](https://coveralls.io/repos/github/SannyTee/More-Recipes/badge.svg?branch=implement-lf-feedback)](https://coveralls.io/github/SannyTee/More-Recipes?branch=implement-lf-feedback) [![Maintainability](https://api.codeclimate.com/v1/badges/3e149fce348f5b0eff09/maintainability)](https://codeclimate.com/github/SannyTee/More-Recipes/maintainability)

# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a food recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.


## Installation
To install this application, 
1.  Git clone this repository `https://github.com/SannyTee/More-Recipes.git`
2.  Change your directory `cd More-Recipes`
3.  Install all dependencies `npm install`
4.  Create .env file which will be used to load environment variables see sample in `.env.example` file in the project
6.  Migrate `sequelize db:migrate`
7.  Start the app `npm start` for development 
8.  Navigate to `localhost:3000` in your browser


## Testing
> - `npm test` - run the unit test for backend
> - `client-test` - run the unit test for frontend and display code coverage result


## Built with
* [NodeJS](https://nodejs.org/en/) - A Javscript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
* [Javascript ES6:](https://en.wikipedia.org/wiki/ECMAScript) ES6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, spread opeartor, etc.
* [React:](https://facebook.github.io/react/tutorial/tutorial.html) Facebook open source, efficient, javascript library for building front-end projects.
* [PostgreSQL:](https://www.postgresql.org/) PostgreSQL is a powerful, open source object-relational database system (ORDBMS) that offers modern database features such as complex queries, foreign keys, etc.
* [Sequelize:](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js that supports different dialects such PostgreSQL, MySQL, and SQLite.
* [Webpack:](https://webpack.github.io/docs/what-is-webpack.html) Webpack is used to bundle modules and does tasks automation.



## API Documentation
THE  Documentation for the More-Recipes Restful API:
[More-Recipes API](https://app.swaggerhub.com/apis/Tywo/more-recipes/1.0.0#/)

## Coding Style
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

## Limitation
1. Users cannot deactivate their accounts
2. Users can only create account once with their username and email
3. Users can not delete their reviews

## How to Contribute
- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works
- Refer to this wiki for proper <a href="https://github.com/SannyTee/More-Recipes/wiki">GIT CONVENTION</a>

## Licence 
[APACHE License](https://github.com/SannyTee/More-Recipes/blob/develop/LICENSE)

## Authors
* Sanni Taiwo



