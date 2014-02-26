# README

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

## Questions

- Requirement
TPFLGBA
modular, scalable, testable components html/css/js
common data structures and algorithms, profiling/optimization, knowledge of algorithms, design patterns, and componentization approaches
Test/tdd
crossbrowser and touch-based


- FE
https://github.com/darcyclarke/Front-end-Developer-Interview-Questions
http://css-tricks.com/interviewing-front-end-engineer-san-francisco/
http://blog.sourcing.io/interview-questions

- CSS
http://philipwalton.com/articles/css-architecture/
http://philipwalton.com/articles/what-no-one-told-you-about-z-index/
Multi column layout method


