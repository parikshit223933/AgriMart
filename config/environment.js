const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

/* when user is accessing the stream */
const accessLogStream=rfs.createStream("access.log", {
    interval:'1d',
    path:logDirectory
  });

const development = {
	name: "development",

	session_cookie_key: "something",
	db: "agrimart_development",
	db_online: process.env.AGRIMART_DB_ONLINE,
	smtp: {
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.AGRIMART_SMTP_EMAIL,
			pass: process.env.AGRIMART_SMTP_PASSWORD
		}
	},
	jwt_secret: "secret",
	stripe_secret_key:
		"sk_test_51H9F89HyvUiMKHjeXM6hg3SfXh1cXrknjsEMavZ1XDcQPy63T5lk3EjEwDyPfMIehwadZvSj4CiffzVLBFA9bswU00dvPXvrkq",
	stripe_publish_key:
		"pk_test_51H9F89HyvUiMKHjejfcy7c0VYxb3a7AvYvCwQ9H7zx00NJpIThu90qwueiPRXsH9j0bfe7sGHWKTe1JWDDAU0ked00l1v3ppVd",
    salt_round: 10,
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }
};

const production = {
	name: "production",

	session_cookie_key: process.env.AGRIMART_SESSION_COOKIE_KEY,
	db: process.env.AGRIMART_DB,
	db_online: process.env.AGRIMART_DB_ONLINE,
	smtp: {
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.AGRIMART_SMTP_EMAIL,
			pass: process.env.AGRIMART_SMTP_PASSWORD
		}
	},
	jwt_secret: process.env.AGRIMART_JWT_SECRET,
	stripe_secret_key: process.env.AGRIMART_STRIPE_SECRET_KEY,
	stripe_publish_key: process.env.AGRIMART_STRIPE_PUBLISH_KEY,
    salt_round: 10,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }
};
console.log('Using', eval(process.env.NODE_ENV)==undefined?'DEVELOPMENT':'PRODUCTION', 'Environment')
module.exports =
	eval(process.env.NODE_ENV) == undefined
		? development
		: eval(process.env.NODE_ENV);
