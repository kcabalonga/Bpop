# Structure of Backend folder

## models folder

Has files for each collection in our database. These files define schemas for the colelctions, and have functions written that modify the database. These functions will be used in app.js to implement api requests such as get and post

### Users.js

Defines the schema for our users collection, which is the profiles on our website. Currently only takes in email, age, and name.

## Seeds folder

Has seeding code to populate the different database collections for testing purposes

##  app.js

has server setup, middleware setup, and definitions of routes for the api.

# Available Scripts
In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

NOTE: npm test info may be wrong, copy pasted it from the front end readme 

## `npm run seed`

Will fill your local mongoDB database users collection with profiles specified in the userSeed.js file. Checks to see if specified user already exists in the database before adding them to prevent duplicate users from being added. NOTE that you must write 'npm run seed' because seed is not special like start, test, stop is etc.



