# Structure of Backend folder

## models folder

Has files for each collection in our database. These files define schemas for the colelctions, and have functions written that modify the database. These functions will be used in app.js to implement api requests such as get and post

### Users.js

Defines the schema for our users collection, which is the profiles on our website. Currently only takes in email, age, and name.

## Seeds folder

Has seeding code to systematically populate or clear the different database collections for testing purposes.

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

launch npm test and test th3 /test, /add-user, /check-user, and /editbio. Will earase the mongo db listinsg and users, so after every test need to re-seed. 

## `npm run seedUsers`

Will fill your local mongoDB database users collection with profiles specified in the userSeed.js file. Checks to see if specified user already exists in the database before adding them to prevent duplicate users from being added. NOTE that you must write 'npm run seed' because seed is not special like start, test, stop is etc.

## `npm run seedListings`

Will fill your local mongoDB database listings collection with profiles specified in the userSeed.js file. Pictures for seeding must be stored in the Seeds folder. NOTE that you must write 'npm run seed' because seed is not special like start, test, stop is etc.

## `npm run clearData`

Will completely clear all users and listings from the mongoDB collection. This cannot be undone, so use with caution. Primarily useful for when seeding information substantially updated, and want to clear current database before re-seeding it. Will ask for confirmation before running to ensure no accidental usage

# `Dependencies you need to install`

Dependencies you will need to install are below. Many you can get simply off npm install, but others require their own isntallation



# ' forgot password '
If you forgot your password and want to log in by inputting your email you need to be connected to a wifi not related to UCLA, examlpe do not use UCLA web or UCLA wifi.

npm install bcrypt
npm install nodemailer crypto
npm install supertest mongoose jest
