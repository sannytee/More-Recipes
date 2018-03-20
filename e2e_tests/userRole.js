/* eslint-disable */
const faker = require('faker');


const randomName = faker.name.findName();
const randomEmail = faker.internet.email();

module.exports = {
  'Users should not be able to signup with invalid details': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'exampleUser')
      .pause(1000)
      .setValue('input[name=password]', 'example2222')
      .pause(1000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(1000)
      .setValue('input[name=email]', randomEmail)
      .pause(1000)
      .click('button[type=submit]')
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'Password does not match')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(2000);
  },
  'Users should not be able to signup with an existing user': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'example20')
      .pause(1000)
      .setValue('input[name=password]', '############')
      .pause(1000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(1000)
      .setValue('input[name=email]', randomEmail)
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'This username already exist')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(2000);
  },
  'Users should not be able to signup with an existing email': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', randomName)
      .pause(1000)
      .setValue('input[name=password]', '############')
      .pause(1000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(1000)
      .setValue('input[name=email]', 'example20@gmail.com')
      .pause(1000)
      .click('button[type=submit]')
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'This email already exist')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(1000);
  },
  'Users should  be able to signup with an valid details': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', randomName)
      .pause(1000)
      .setValue('input[name=password]', '############')
      .pause(1000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(1000)
      .setValue('input[name=email]', randomEmail)
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('img[name=image]', 5000)
      .assert.urlContains('http://localhost:3000/signin')
      .pause(2000);
  },
  'Users should not be able to signin with invalid details': (client) => {
    client
      .url('http://localhost:3000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', randomName)
      .pause(1000)
      .setValue('input[name=password]', randomName)
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'Incorrect Login details')
      .assert.urlContains('http://localhost:3000/signin')
      .pause(2000);
  },
  'Users should be able to signin with valid details': (client) => {
    client
      .url('http://localhost:3000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'example20')
      .pause(1000)
      .setValue('input[name=password]', 'example97')
      .pause(1000)
      .click('button[type=submit]')
      .waitForElementVisible('div[class=content]', 10000)
      .assert.urlContains('http://localhost:3000/recipes')
      .pause(1000);
  },
  'Users should be able to add recipe': (client) => {
    client
      .url('http://localhost:3000/recipes')
      .waitForElementVisible('div[class=content]', 10000)
      .click('button[data-toggle=modal]')
      .pause(2000)
      .setValue('input[name=recipeName]', 'awesomestuff')
      .pause(1000)
      .setValue('#message-text', 'awesomestuff')
      .pause(1000)
      .setValue('#ingredients', 'meat, goat')
      .pause(1000)
      .setValue('#method-text', 'boil the meat\nfry the meat')
      .pause(1000)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 10000)
      .assert.containsText('.toast', 'Recipe successfully added to catalog')
      .pause(2000);
  },
  'Users can edit recipe added by them': (client) => {
    client
      .url('http://localhost:3000/my-recipes')
      .waitForElementVisible('div[class=container]', 10000)
      .assert.elementPresent('div[class=container]')
      .click('.btn.edit-btn')
      .pause(2000)
      .waitForElementVisible('#editRecipeForm', 10000)
      .assert.elementPresent('#editRecipeForm')
      .assert.elementPresent('input#recipient-name')
      .clearValue('#recipeName')
      .pause(1000)
      .setValue('input#recipeName', 'beans')
      .pause(2000)
      .click('#editButton')
      .waitForElementVisible('.toast', 7000)
      .assert.containsText('.toast', 'Recipe successfully updated')
      .pause(2000);
  },
  'Users can  view and review a recipe': (client) => {
    client
      .url('http://localhost:3000/recipes')
      .pause(2000)
      .click('#remove-link')
      .waitForElementVisible('.recipe-details', 10000)
      .assert.elementPresent('.recipe-details')
      .pause(2000)
      .setValue('textarea[name=review]', 'amazing')
      .pause(2000)
      .click('#reviewButton')
      .pause(2000);
  },
  'Users can favorite a recipe': (client) => {
    client
      .url('http://localhost:3000/recipes')
      .pause(2000)
      .click('#remove-link')
      .waitForElementVisible('.recipe-details', 10000)
      .assert.elementPresent('.recipe-details')
      .pause(2000)
      .click('#favoriteButton')
      .waitForElementVisible('.toast', 7000)
      .assert.containsText('.toast', 'Recipe Favorited')
      .pause(2000);
  },
  'Users can view their  favorite recipe': (client) => {
    client
      .url('http://localhost:3000/my-favorite')
      .waitForElementVisible('.container', 10000)
      .assert.elementPresent('.card-space')
      .assert.urlContains('http://localhost:3000/my-favorite')
      .pause(2000);
  },
  'Users can remove recipe from their  favorite recipe': (client) => {
    client
      .url('http://localhost:3000/my-favorite')
      .waitForElementVisible('.container', 10000)
      .assert.elementPresent('.section-popular')
      .assert.urlContains('http://localhost:3000/my-favorite')
      .pause(3000)
      .click('#favoriteButton')
      .pause(3000)
      .click('.swal2-confirm.btn.btn-danger')
      .pause(2000)
      .click('.swal2-confirm.swal2-styled')
      .pause(2000)
  },
  'Users can delete recipe added by them': (client) => {
    client
      .url('http://localhost:3000/my-recipes')
      .waitForElementVisible('div[class=container]', 10000)
      .execute(function () {
        document.querySelector('.btn.btn-danger').click();
      })
      .pause(2000)
      .click('#deleteButton')
      .waitForElementVisible('.toast', 7000)
      .assert.containsText('.toast', 'Recipe successfully deleted')
      .pause(2000)
      .url('http://localhost:3000/recipes')
      .pause(2000)
      .click('#logout')
      .pause('1000')
      .assert.urlContains('http://localhost:3000')
      .end();
  }
};

