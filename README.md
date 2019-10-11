[![Build Status](https://travis-ci.org/Nigorjeanluc/Teamwork.svg?branch=develop)](https://travis-ci.org/Nigorjeanluc/Teamwork)
[![Coverage Status](https://coveralls.io/repos/github/Nigorjeanluc/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/Nigorjeanluc/Teamwork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/2fc79a3dcdb30be04e2f/maintainability)](https://codeclimate.com/github/Nigorjeanluc/Teamwork/maintainability)
# Teamwork Project
Teamwork project is an online web application that provides an easy way to communicate with your co-workers. This can help to solve problems of miscommunication within an organisation and increase the organisation's effectiveness by collaboration between co-workers.

## Features
* Employees can create their own user account. 
* Employees can sign in.
* Employees can write and/or share articles with colleagues on topics of interest to them.
* Employees can edit their articles.
* Employees can delete their articles.
* Employees can comment on other colleagues' article post.
* Employees can view all articles showing the most recently posted articles first.
* Employees can view a specific article.

## Prerequisites
  * Node
  * Postman
  
## Technology in action

### Frontend
  * JavaScript
  * HTML
  * CSS

### Backend
  * Node
  * Express
  * mocha
  * Postgres

# To Getting Started
Starting application run the following npm command
* `npm start` for starting the server.
* `npm run dev` for starting the development mode.

# For Testing
When you need to test this application and see the tests coverate rate:
* `npm run test` for running the tests, and getting coverage rate summary.

# APIs

* POST `/api/v2/auth/signup` signup on banka application.
* POST `/api/v2/auth/signin` signin on banka application. 

* POST `/api/v2/articles` Create an article.
* GET `/api/v2/feeds` Read all articles.
* PATCH `/api/v2/articles/:id` Edit an article.
* DELETE `/api/v2/articles/:id` Delete an article.

* POST `/api/v1/articles/:id/comments` Create a comment for a specific article.

## Github-page
GitHub pages (gh-page) for this project Team work web application and can be accessed using this link: (https://nigorjeanluc.github.io/Teamwork/UI/html ) or simply [click here](https://nigorjeanluc.github.io/Teamwork/UI/html)

## Author
Igor Jean-Luc Ndiramiye
