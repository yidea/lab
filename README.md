# README

## TODO

- cron/scheduler; weather; email/prowl/weibo/twitter
- BB/Marinate
- web worker/websocket
- Async
- Jekins CI 

## Deployment

- npm install; bower i --allow-root
- forever start web.js
 
## Git

- git remote -v 
- git push heroku master

## Project Run

- grunt serve //run app w Livereload on localhost:9000
- grunt test //run unit test
- grunt //build production ready code. generate in  /dist

## Project Setup

- FE Stack:
Sass&Compass + jQuery + Backbone + Underscore + Requrejs + Handlebars + Modernizr
Bower + Grunt + Livereload
Mocha + Chai + Sinon

- Commands:
yo backbone --template-framework=handlebars  //then select requirejs, by default test framework mocha + chai
bower install backbone.localStorage --save //bower list bower.json
cd test && bower install sinon --save
npm install & bower install //package.json npm
npm install moment --save //install and add to package.json
grunt bower //inject Bower dependecy to RequireJS configuration in main.js

yo backbone:model todo  //create bb model
yo backbone:view todo //create bb view

// Gruntfile.js
remove coffeescript related task if you don't have any *.coffee

// Index.html
Add bootstrap css
  <link rel="stylesheet" href="bower_components/sass-bootstrap/dist/css/bootstrap.css">

// Karma spawn EACCESS error
sudo chmod -R a+rwx yo/

// Unit Test & Code Coverage
// blanket only works w mocha 1.13.0 somehow for now
https://nicolas.perriault.net/code/2013/get-your-frontend-javascript-code-covered/
