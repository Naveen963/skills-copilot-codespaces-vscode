// Create web server 
// Create a web server that listens on port 3000 and serves the comments.html file that's in the public directory. 
// The comments.html file should have a form that allows users to submit comments. 
// When the form is submitted, the comment should be saved to a file called comments.txt. 
// Each comment should be on its own line in the file. 
// After the comment is saved, the user should be redirected back to the comments.html page.

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comments.html'));
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;

    fs.appendFile('comments.txt', comment + '\n', (err) => {
        if (err) {
            res.status(500).send('Unable to save comment');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});