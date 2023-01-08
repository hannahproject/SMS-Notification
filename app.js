const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// TWILIO
const accountSid = 'ACfa6d83b91c6de3f636961e5dfb45d13d',
    authToken = '5f30826a3aee72c555888abb2cc3523a';
const client = require('twilio')(accountSid, authToken);

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    const num_one = req.body.receipientone;
    const num_two = req.body.receipienttwo;
    const twilio_number = '+18507504584';

    client.messages
        .create({
            body: 'Kumain ka na ba?',
            to: num_one,
            from: twilio_number
        })
        .then(message => {
            console.log(message.sid);
            res.redirect('/');
        })
        .catch(error => {
            res.redirect('/');
            console.log(error);
        });


    client.messages
    .create({
        body: 'Hello Driver!',
        from: twilio_number,
        to: num_two
    })
    .then(message => console.log(message.sid))
    .catch(error => console.log(error));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));