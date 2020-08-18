<h1 align="center"> Agrimart </h1> <br>
<p align="center">
  <a href="http://agrimart.tech">
    <img alt="Agrimart" title="Agrimart" src="https://www.pinclipart.com/picdir/big/141-1414730_flower-stem-template-1-buy-clip-art-seedling.png" width="150">
  </a>
</p>

<p align="center">
  Ecommerce Web App Based on MERN Stack, Hosted on AWS EC2.
</p>

<p align="center">
    <img alt="Download on the App Store" title="App Store" src="https://geeksperhour.com/wp-content/uploads/2019/02/mern-img.png" width="240">
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Contributors](#contributors)
- [Development](#development)
- [Component Structure](#component-structure)

## Introduction

[![Build Status](https://img.shields.io/badge/Build-Success-brightgreen)](success)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](contributors)

Welcome to Agrimart, your number one source for all your agricultural needs. We're dedicated to giving you the very best of all services, with a highly converged focus on hygine, good customer service and uniqueness under the hood. We hope you enjoy our products and services as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

<p align="center">
  <img src = "https://github.com/parikshit223933/AgriMart/blob/master/client/src/images/sc2.PNG" width=400><img src = "https://github.com/parikshit223933/AgriMart/blob/master/client/src/images/sc1.PNG" width=400>
</p>

## Features

A few of the things you can do with Agrimart:

* Create your own products
* Upvote Users
* Create Reviews for the products
* Like/Dislike Reviews
* Add Products to Cart
* Change product Quantity or delete the products in the cart directly from the cart
* Sort Products according to inc./dec. Price, age of the product or Customer Ratings in the categories
* Login with Google
* Easily Search for products on homepage.

<p align="center">
  <img src = "https://github.com/parikshit223933/AgriMart/blob/master/client/src/images/sc3.png" width=200> <img src = "https://github.com/parikshit223933/AgriMart/blob/master/client/src/images/sc4.png" width=700>
</p>

<p align="center">
  <img src = "https://github.com/parikshit223933/AgriMart/blob/master/client/src/images/sc5.png" width=200> <img src = "https://github.com/parikshit223933/AgriMart/blob/master/client/src/images/sc6.png" width=400>
</p>

## Contributors
1. <a href="https://github.com/parikshit223933">Parikshit Singh</a>
2. <a href="https://github.com/tushar1999sharma">Tushar Sharma</a>
3. <a href="https://github.com/chandrdubey">Chandra Prakash Dubey</a>

## Development
1. git clone https://github.com/parikshit223933/AgriMart.git
2. cd ./Agrimart
3. npm install
4. cd ./client
5. npm install
6. npm start (or `npm run build` -> `npm install -g serve` -> `serve -s build` for production/optimised build of react)
7. cd ..
8. npm start (or `npm run prod_start` for production build)
9. open localhost:5000 and start development.

## Component Structure
```
Root:.
├───client
│   ├───build
│   │   └───static
│   │       ├───css
│   │       ├───js
│   │       └───media
│   ├───public
│   └───src
│       ├───actions
│       ├───components
│       │   ├───AuthenticationComponent
│       │   ├───CartComponent
│       │   ├───CategoriesComponent
│       │   ├───HomeComponent
│       │   ├───MAIN_APP
│       │   ├───MoreInfoComponent
│       │   ├───NavbarComponent
│       │   ├───Page404Component
│       │   ├───PaymentComponents
│       │   ├───ProfileComponent
│       │   ├───ReviewComponent
│       │   ├───Routes
│       │   ├───SellComponent
│       │   └───SingleProductComponent
│       ├───helpers
│       ├───images
│       ├───reducers
│       └───store
├───config
├───controllers
│   └───api
│       └───v1
├───mailers
├───models
├───production_logs
├───routes
│   └───api
│       └───v1
├───uploads
│   ├───products
│   └───users
│       └───avatars
├───validations
├───views
│   ├───mailers
│   │   ├───auth
│   │   ├───product
│   │   └───selfMailer
│   ├───products
│   └───review
└───workers
```

