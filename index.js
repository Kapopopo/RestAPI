// CONFIGURATION DE MES VARIABLES :
const express = require('express');
const mysql = require('mysql');
const app = express();
const expressPort = 3000;

// PERMET A L'API DE COMMUNIQUER EN JSON :
app.use(express.json());

// CONFIGURATION DE LA DB ( ADRESSE, ET IDENTIFICATION ADMIN, PORTS, ect...) :
const dataBase = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'restapi',
});

// CONNEXION A LA DATABASE AVEC LA FONCTION CONNECT
dataBase.connect((err) => {
  if (err) {
    console.log('ERREUR DE CONNEXION A LA DATABASE !');
  } else {
    console.log('BRAVO, VOUS ÊTES CONNECTÉ À LA DATABASE !');
  }
});

app.listen(expressPort, () => {
  console.log('MON SERVEUR TOURNE SUR LE PORT : ', expressPort);
});