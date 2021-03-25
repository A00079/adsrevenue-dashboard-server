const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const db = require('./db/db.js');

const Contact = require('./routes/Contact/contactus.js');
const PostEmailTemplates = require('./routes/PostEmailTemplates/EmailTemplates.js');
const Employees = require('./routes/Employees/employees.routes');

// Middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// Routes
app.use('/api/client/contact', Contact);
app.use('/api/client/postemail', PostEmailTemplates);
app.use('/api/adsrevenue', Employees);

if (process.env.NODE_ENV === 'production') {

	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});

}

app.listen(port, () => {
	console.log(`Server Running at ${port}`);
});