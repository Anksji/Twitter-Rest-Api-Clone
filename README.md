# Twitter Clone - Api Nodejs, Mongodb & Express JS
##
# Author
_Ankit Dwivedi_

[![Build Status](https://travis-ci.org/anksji/NewsApp-RestApi.svg?branch=main)](https://travis-ci.org/anksji/NewsApp-RestApi)

## Introduction
I have created twitter app Rest-Api, developed with the help of Node and Express js. I am using middleware to authenticate every request and also implemented a router to segregate every endpoints.

## Using
- This Api has been built with the help of Nodejs and Express js.
- Using JWT token for authentication. 
- Using middleware for authentication of every request.
- Using Router structure for api path navigation
- Using MongoDB as a backend for the project.


## Features
- This project covers complete operations such as create, update, read, and delete on different endpoints such as users, feed, tweet, retweet, like and reply etc.
- I am authenticating each request with the help of middleware.

## Route path 
##
| METHOD | PATH |
| ------ | ------ |
| Post | /api/v1/users/signup/ |
| Post | /api/v1/users/signin/ |
| Get, Put, Delete | /api/v1/users/profile/ |
| Post, Get, Put, Delete | /api/v1/users/followers/ |
| Post, Get, Put, Delete  | /api/v1/trends/ |
| Post, Get, Put, Delete  | /api/v1/tweets/ |
| Get | /api/v1/tweets/feed/ |
| Get  | /api/v1/tweets/filter/ |
| Post, Get, Put, Delete  | /api/v1/trendingPost/ |
| Post, Get, Put, Delete  | /api/v1/topic/ |
| Get, Delete  | /api/v1/hashtag/ |



## How to use it

1. You should have node js installed in your system.
2. I used VS code editor to write this program you can use of your choice.
3. Clone this repo in your local machine and import it to your editor.
4. Add your Mongodb Url in index.js file.
5. and hit run in your terminal _npm start_, project will run in your localhost in port number 5000. 
4. Test all the Api with Postman.


# Contribute
This project needs more improvement, you can try this by forking it and after your valuable changes made a pull request.



