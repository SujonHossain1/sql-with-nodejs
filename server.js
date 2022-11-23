const mysql = require('mysql');
const express = require('express');

const app = express();

const middleware = [express.json(), express.urlencoded({ extended: true })];
app.use(middleware);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodemysql',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql Connected...');
  console.log("Yeah, I'm connected to the database");
});

app.get('/', (req, res) => {
  const sql =
    'CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255),  PRIMARY KEY (id));';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('USERS table created');
  });
});

app.get('/create-all-table', (req, res, next) => {
  // create user
  const user_sql = '';
});

app.get('/api/users', (req, res, next) => {
  const sql = 'SELECT * from users;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.post('/api/users', (req, res, next) => {
  const sql = 'INSERT INTO users SET ?;';
  const { body } = req;
  db.query(sql, body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      message: 'User added successfully',
    });
  });
});

app.patch('/api/users/:id', (req, res, next) => {
  const { body, params } = req;
  const { id } = params;

  const sql = 'UPDATE users set ? WHERE id = ?;';
  db.query(sql, [body, id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      message: 'User updated successfully',
    });
  });
});

app.delete('/api/users/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;

  const sql = 'DELETE FROM users WHERE id = ?;';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      message: 'User deleted successfully',
    });
  });
});

app.get('/droip-table', (req, res, next) => {
  const sql = 'DROP TABLE admin;';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Table deleted');
  });
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

// ******* select few data  *******;
app.get('/create-product-table', (req, res) => {
  const sql =
    'CREATE TABLE products (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, price INT NOT NULL, description TEXT, images TEXT, PRIMARY KEY(id));';

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      message: 'create table',
    });
  });
});

app.post('/api/products', (req, res, next) => {
  const { body } = req;
  const { name, price, images, description } = body;
  const _images = JSON.stringify(images);

  const product = {
    name,
    price,
    description,
    images: _images,
  };

  const sql = 'INSERT INTO products SET ?;';
  db.query(sql, product, (err, result) => {
    if (err) throw err;
    res.send({
      data: result,
      message: 'Insert data',
    });
  });
});

app.post('/api/products-1', (req, res, next) => {
  const { body } = req;
  const { name, price, images, description } = body;
  const _images = JSON.stringify(images);

  const sql =
    'INSERT INTO products  (name, price, description, images) VALUES (?, ?, ?, ?);';
  db.query(sql, [name, price, description, _images], (err, result) => {
    if (err) throw err;
    res.send({
      data: result,
      message: 'Insert data',
    });
  });
});
