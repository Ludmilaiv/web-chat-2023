const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'webchatdb';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const usersCollection = db.collection('users');

  // Создание документа
  const user = {login: "tom", password: "tom123"};

	// Добавление документа
  const insertResult = await usersCollection.insertOne(user);
  console.log('Inserted document =>', insertResult); 

	// Поиск документа
	const filteredDoc = await usersCollection.findOne({ login: "tom" });
	console.log('Found documents filtered by { a: 3 } =>', filteredDoc);

	// Редактирование документа
	const updateResult = await usersCollection.updateOne({ login: "tom" }, { $set: { password: "newpass" } });
	console.log('Updated documents =>', updateResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());