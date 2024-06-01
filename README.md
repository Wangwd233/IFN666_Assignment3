# IFN666_Assignment3
Assignment 3 Project for IFN666

Purpose

The purpose of this project is build a pets and animal care application to let users add and mannage the feeding time their pets on the app

Description of contribute

This project is individually developed by myself with only the help and suggestion from ChatGPT4.0

Features

A toolbar at the bottom of the app
Home Screen
About Screen
Setting Screen
Login features
Sign up features
Change font size and color
Change background color
Show all pets added by current user
Add a pet with information
User setting timer to notice time of feeding pets
A list of license in about screen as a drop-down list
Backend routers to Select, Create, Update and Delete data from database

Dependencies

To run this application successfully, you should install the following libraries:

For the frontend (The React Expo application), the following command should be run to install libraries:


npm install react-native-vector-icons

npm install react-native-picker

npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs 
react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context 
@react-native-community/masked-view @expo/vector-icons

npm install @react-native-picker/picker

npm install @react-native-community/slider

expo install @react-native-async-storage/async-storage

npm install react-native-dotenv

npm install react-native-modal-datetime-picker

npm install @react-native-community/datetimepicker

npm install date-fns

npm install -g npm-license-crawler

npm install --save-dev npm-license-crawler


For the backend (The npm express server), the following command should be run to install libraries:

npm install mysql2 knex

npm install bcrypt jsonwebtoken

npm install cors

npm install dotenv

npm install swagger-ui-express


Application Architecture

a3front
.
├── .env
├── .expo/
├── .gitignore
├── AboutScreen.js
├── AddPetScreen.js
├── App.js
├── app.json
├── assets/
├── babel.config.js
├── components/
│   ├── AuthContext.js
│   ├── ServiceButton.js
│   ├── SettingsContext.js
├── FeedPetScreen.js
├── HomeScreen.js
├── licenses.json
├── LoginScreen.js
├── node_modules/
├── package-lock.json
├── package.json
├── PetsScreen.js
├── SettingsScreen.js
├── SignUpScreen.js
└── UpdatePetScreen.js

a3back
.
├── .env
├── app.js
├── bin/
├── db.js
├── node_modules/
├── package-lock.json
├── package.json
├── public/
├── routes/
│   ├── index.js
│   ├── login.js
│   ├── pets.js
│   └── users.js
└── views/

How to report issue

email: n11378123@qut.edu.au


Swagger API document:

in ./a3back/docs/open.json
or start server and directly access: "your server address/docs"