const User = require("../models/user")

exports.registerPage = function (req, res) {
	res.render("register", {
		title: "Регистрация",
		layout: './layouts/main-layout'
	});
}

exports.addUser = async function(req,res) {
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
}