const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	login: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 20
	},
});

userSchema.methods.done= function() {
	const greeting = `User ${this.login} has been successfully registered`;
	console.log(greeting);
}

const User = mongoose.model('User', userSchema);

router.post('/', async function(req, res, next) {
	const user = new User({
		login: req.body.login,
		password: req.body.password
	});

	try {
		const userDocument = await User.findOne({login: user.login});
		if (!userDocument) {
			await user.save();
			user.done();
			res.send(`Пользователь ${user.login} успешно зарегистрирован`);
		} else {
			console.log("this login is already taken");
			// res.send(`Логин ${user.login} занят`);
			res.render("register", {
				errMess: "Пользователь с таким именем уже существует",
				errSelector: "login", 
				title: "Регистрация",
				password: req.body.password, 
				login: req.body.login,
				layout: './layouts/main-layout'
			});
		}
	} catch (err) {
		if (err.errors.password) {
			console.log("Password validation error");
			res.render("register", {
				errSelector: "password", 
				title: "Регистрация",
				password: req.body.password, 
				login: req.body.login,
				layout: './layouts/main-layout'
			});
		}
		else if (err.errors.login) {
			console.log("Login validation error");
			res.render("register", {
				errSelector: "login", 
				title: "Регистрация",
				password: req.body.password, 
				login: req.body.login,
				layout: './layouts/main-layout'
			});
		}
	}
});

router.get('/', function(req, res, next) {
	res.render("register", {
		title: "Регистрация",
		layout: './layouts/main-layout'
	});
});


module.exports = router;