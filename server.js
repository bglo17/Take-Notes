const express = require ('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();
const notes = require('./db/db.json');
const { fstat } = require('fs');

console.log(notes);

const PORT = 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
    );

app.get('api/notes', (req,res)=> 
    res.json(db)
);

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    const newNotes = {
        title, 
        text, 
        id : uuidv4()
    }

    db.push(newNotes);
    fs.writeFile('./db/db.json' , JSON.stringify(db, null, 4), (err) =>

    res.json(db)
});

app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);