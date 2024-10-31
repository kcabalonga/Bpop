//This file contains code that will be used by server to handle requests to access infomration in the user files folder

//required modules that are being imported to make functions easier
const fs = require('fs');
const path = require('path');

//this line creates the variable dataDir which will stores a filepath to the folder where we are storing all our profiles. __dirname grabs path to where the file in which __dirname was called, ../ is saying to leave this location (which will be the model folder) and Profiles is saying to then enter the Profiles folder
const dataDir = path.join(__dirname, '../Profiles');

//Helper function that uses dataDir above to then make the full file path leading to a particular user profile, requiring userid to locate. Files will be named like "user1" and "user2", etc., with the number after user being the userId.
const getUserFilePath = (userId) => path.join(dataDir, `user${userId}.json`);

//function that gets user details when passed a userID
const getUser = (userId) => {
    return new Promise((resolve, reject) => {
	const filePath = getUserFilePath(userId);

	//this uses fs module to try and read in info (
	fs.readFile(filePath, 'utf8', (err, data) => {
	    if (err)
	    {
		return reject('User not found');
	    }
	    try
	    {
		resolve(JSON.parse(data));
	    }
	    catch (error)
	    {
		reject('Error parsing user data');
	    }
    });
  });
};

