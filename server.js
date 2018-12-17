// server.js
const express= require('express');
const app = express();

require('dotenv').config();

const { Client } = require('pg');
const bodyParser = require('body-parser');


app.use(bodyParser());

app.get('/', (req, res) => {
  res.send("Hellooo World");
});

app.post('//users', (req, res) => {
  const client = new Client({
  	host: 'localhost',
  	port: 5432,
  	user: 'postgres',
  	password: 'L2KcEafV',
  });
  client.connect()
	.then(() => {
		const sql = "SELECT * FROM public.mobile_users WHERE username=$1 AND password=$2;";
		const params = [req.body.username, req.body.password];
		return client.query(sql, params);
	})
	.then((result) => {
		if (result.rows[0])
			res.sendStatus(200);
		else
			res.sendStatus(404);
	})
	.catch(e => console.error(e.stack));
});

app.listen(3000, () => console.log(`Listening on port ${process.env.PORT}...`));

