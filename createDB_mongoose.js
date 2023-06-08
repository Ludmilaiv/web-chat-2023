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

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/webchatdb');
	console.log('Connected successfully to server');

	// Сздание нового документа
	const user = new User({ login: 'itgenik', password: 'qwerty' });

	// Добавление документа в БД
	const userDocument = await User.findOne({login: user.login});
	if (!userDocument) {
		await user.save();
		user.done();
	} else {
		console.log("this login is already taken")
	}

	// Поиск документа
	const findUser = await User.findOne({login: "itgenik"});
	console.log(findUser);
	
}