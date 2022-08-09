const path = require('path');
var nodemailer = require('nodemailer');

module.exports = {
	register: function (req, res, cb) {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		});
		const mailOptions = {
			from: process.env.EMAIL,
			to: req.body.email,
			subject: req.body.election_name + 'Registration',
			html: 'Congragulations you have been registered for  ' + req.body.election_name + ' election.',
		};
		transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				res.json({ status: 'error', message: 'mail error', data: null });
				console.log(err);
			} else console.log(info);
			res.json({ status: 'success', message: 'Email sent successfully!!!', data: null });
		});
	},
};
