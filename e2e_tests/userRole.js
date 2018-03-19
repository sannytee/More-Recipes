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
      .pause(3000)
      .setValue('input[name=password]', 'example2222')
      .pause(3000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(3000)
      .setValue('input[name=email]', randomEmail)
      .pause(3000)
      .click('button[type=submit]')
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'Password does not match')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(3000);
  },
  'Users should not be able to signup with an existing user': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'example2')
      .pause(3000)
      .setValue('input[name=password]', '############')
      .pause(3000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(3000)
      .setValue('input[name=email]', randomEmail)
      .pause(3000)
      .click('button[type=submit]')
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'This username already exist')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(3000);
  },
  'Users should not be able to signup with an existing email': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', randomName)
      .pause(3000)
      .setValue('input[name=password]', '############')
      .pause(3000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(3000)
      .setValue('input[name=email]', 'example20@gmail.com')
      .pause(3000)
      .click('button[type=submit]')
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'This email already exist')
      .assert.urlContains('http://localhost:3000/signup')
      .pause(3000);
  },
  'Users should  be able to signup with an valid details': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'example1946')
      .pause(3000)
      .setValue('input[name=password]', '############')
      .pause(3000)
      .setValue('input[name=confirmPassword]', '############')
      .pause(3000)
      .setValue('input[name=email]', randomEmail)
      .pause(3000)
      .click('button[type=submit]')
      .waitForElementVisible('img[name=image]', 5000)
      .assert.urlContains('http://localhost:3000/signin')
      .pause(3000);
  },
  'Users should not be able to signin with invalid details': (client) => {
    client
      .url('http://localhost:3000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', randomName)
      .pause(3000)
      .setValue('input[name=password]', randomName)
      .pause(3000)
      .click('button[type=submit]')
      .waitForElementVisible('.alert', 10000)
      .assert.containsText('.alert', 'User not found')
      .assert.urlContains('http://localhost:3000/signin')
      .pause(3000);
  },
  'Users should be able to signin with valid details': (client) => {
    client
      .url('http://localhost:3000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'example20')
      .pause(3000)
      .setValue('input[name=password]', 'example97')
      .pause(3000)
      .click('button[type=submit]')
      .waitForElementVisible('div[class=content]', 10000)
      .assert.urlContains('http://localhost:3000/recipes')
      .pause(3000);
  },
  'Users should be able to add recipe': (client) => {
    client
      .url('http://localhost:3000/signin')
      .waitForElementVisible('body', 10000)
      .setValue('input[name=username]', 'example20')
      .setValue('input[name=password]', 'example97')
      .click('button[type=submit]')
      .waitForElementVisible('div[class=content]', 10000)
      .click('button[data-toggle=modal]')
      .pause(5000)
      .setValue('input[name=recipeName]', 'awesomestuff')
      .pause(2000)
      .setValue('#message-text', 'awesomestuff')
      .pause(2000)
      .setValue('#ingredients', 'meat, goat')
      .pause(2000)
      .setValue('#method-text', 'boil the meat\nfry the meat')
      .pause(2000)
      .click('button[type=submit]')
      .waitForElementVisible('.toast', 10000)
      .assert.containsText('.toast', 'Recipe successfully added to catalog')
      .pause(3000);
  },
  'Users can delete recipe added by them': (client) => {
    client
      .url('http://localhost:3000/signin')
      .waitForElementVisible('body', 10000)
      .setValue('input[name=username]', 'example20')
      .setValue('input[name=password]', 'example97')
      .click('button[type=submit]')
      .pause(2000)
      .url('http://localhost:3000/my-recipes')
      .waitForElementVisible('div[class=container]', 10000)
      .execute(function () {
        document.querySelector('.btn.btn-danger').click();
      })
      .pause(2000)
      .click('#deleteButton')
      .waitForElementVisible('.toast', 7000)
      .assert.containsText('.toast', 'Recipe successfully deleted')
      .pause(2000);
  },
  'Users can edit recipe added by them': (client) => {
    client
      .url('http://localhost:3000/signin')
      .waitForElementVisible('body', 10000)
      .setValue('input[name=username]', 'example20')
      .setValue('input[name=password]', 'example97')
      .click('button[type=submit]')
      .pause(2000)
      .url('http://localhost:3000/my-recipes')
      .waitForElementVisible('div[class=container]', 10000)
      .execute(function () {
        document.querySelector('.btn.edit-btn').click();
      })
      .pause(2000)
      .setValue('input[name=recipeName]', 'Beans')
      .pause(2000)
      .clearValue('#method-text')
      .setValue('#method-text', 'pick the beans\nboil the beans')
      .pause(2000)
      .click('#editButton')
      .waitForElementVisible('.toast', 7000)
      .assert.containsText('.toast', 'Recipe successfully updated')
      .end();
  },

};

