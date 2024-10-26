const express = require("express");
const fs = require('fs');               //file system module, makes file navigation on server easier
const path = require('path');           //helps work with manipulating files

const app = express();
const PORT = 3000;

//checking if server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });