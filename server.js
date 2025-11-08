const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3924617Jane12',
    database: 'oportuNetDB'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err.message);
    } else {
        console.log('✅ Conexión exitosa a MySQL');
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor Node.js funcionando correctamente 🚀');
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
