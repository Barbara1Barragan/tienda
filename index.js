const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.static('public')); // Para servir archivos estáticos (HTML, CSS, JS)

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Tienda_de_Ropa'
});

connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM producto', (error, results) => {
    if (error) {
      res.status(500).send('Error en la consulta productos');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuario', (error, results) => {
    if (error) {
      res.status(500).send('Error en la consulta usuarios');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
