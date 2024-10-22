// CONFIGURATION DE MES VARIABLES :
const express = require('express')
const mysql = require('mysql')
const app = express()
const expressPort = 3000

// PERMET A L'API DE COMMUNIQUER EN JSON :
app.use(express.json())

// CONFIGURATION DE LA DB ( ADRESSE, ET IDENTIFICATION ADMIN, PORTS, ect...) :
const dataBase = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'restapi',
})

// CONNEXION A LA DATABASE AVEC LA FONCTION CONNECT
dataBase.connect((err) => {
  if (err) {
    console.log('ERREUR DE CONNEXION A LA DATABASE !')
  } else {
    console.log('BRAVO, VOUS ÊTES CONNECTÉ À LA DATABASE !')
  }
})

app.listen(expressPort, () => {
  console.log('MON SERVEUR TOURNE SUR LE PORT : ', expressPort)
})

app.get('/items', (req, res) => {

  const sql = 'SELECT * FROM items'
  dataBase.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({error : 'ERREUR DU SERVEUR NULL'})
    } else {
      return res.status(200).json(result)
    }
  })
})


app.get('/select_id', (req, res) => {
  const sql = 'SELECT * FROM items WHERE id_category = 3';

  dataBase.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'ERREUR DU SERVEUR NULL' });
    } else {
      return res.status(200).json(result);
    }
  });
});


app.post('/create', (req, res) => {
  const { name, price, id_category, description } = req.body;

  const sql = 'INSERT INTO items (name, price, id_category, description) VALUES (?, ?, ?, ?)';
  const values = [name, price, id_category, description];

  dataBase.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'ERREUR DU SERVEUR NULL' });
    } else {
      return res.status(200).json(result);
    }
  });
});


app.delete('/delete/:id', (req, res) => {

  const { id } = req.params;
  const sql = 'DELETE FROM items WHERE id = ?';
  const value = [id];

  dataBase.query(sql, value, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'ERREUR DU SERVEUR NULL' });
    } else {
      return res.status(200).json(result);
    }
  });
});


app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, price, id_category, description } = req.body;
  const sql = 'UPDATE products SET name = ?, price = ?, id_category = ?, description = ? WHERE id = ?';
  const values = [name, price, id_category, description, id];

  dataBase.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'ERREUR DU SERVEUR NULL' });
    } else {
      return res.status(200).json(result);
    }
  });
});
