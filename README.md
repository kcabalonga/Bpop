# What is Bpop?

Bpop is a website developed by UCLA students for the UCLA community. It is similar to depop, allowing UCLA community members to buy and sell used clothing and objects.
By focusing on the UClA community as the primary user demographic, we are 
able to encourage more people to participate in the **_affordable_** and **_sustainable_** practice of buying used clothes who may have been driven off other websites like depop by 
shipping prices, shipping times, and interactions with strangers who can easily avoid accountability. Bpop centers around UCLA, so picking up and delivering clothes
is as easy as meeting on campus. Furthermore, there is a higher level of accountability on the behalf of sellers and buyers, as users are all part of the same UCLA 
community and can garner a reputation.

# Requirements

Write required installations here, 

# How to run locally

Steps to run locally here. Include terminal commands to run. Just assume the the repo has been downloaded off git. Remember to specify npm install, and to specify  dependency installation.

```
Can use code blocks like this to show what commands must be done i.e.

cd/path/to/your/folder
```
```
npm install
```

# Available tags

The following are the tags that are hardcoded into the website, and that you can search for on the landing page. More tags can be added, but ensure that additional tags are included in the 
various places where potential tags are proposed via dropdown menus (i.e. the profile page for create listings, the landing page where tags are chosen to filter by, etc.)

- accessory
- athletic"
- graphic
- hat
- jacket
- long-sleeve
- shirt
- short-sleeve
- shorts
- socks
- vintage
- modern
- object

Note that they are in alphabetical order. If add more tags, good to maintain this for clarity

# Structure

## Backend

### App.js

Contains the code for setting up the server, and the api routes

### Models folder

Contains the schema for our two collections: **Users** and **Listing**. You can read more about them in the backend's README

### Seeds folder

Contains the seeding information to populate the database with listings and users. Also contains command to clear database. See more specifics in backend's README

### Server test.js

Contains the tests for backend server. Can run 'npm test' in backend folder to execute these tests. 

:exclamation:**_The testing code does succesfully test the program, but WILL delete all entries in the Users and Listings collections_**:exclamation:

## Frontend

### Public

Contains the HTML files for some of our pages. Note that many have become unused as we switched from html pages to react, and are thus useless/can be deleted

### Src

- Has the components folder, which has the components used throughout our webpages
- Has the images folder, with used images
- Has Pages folder, with the pages used by our app
- App.js & App.css establish routes and styling
- Other files related to general setup and structure

# Contributors

- [BriboSD](https://github.com/BriboSD)
- write your guys' account names here


