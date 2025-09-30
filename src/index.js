require('dotenv').config(); // <- Carga variables de entorno desde un archivo .env, como PORT y MONGO_URI. Evita poner datos sensibles directamente en el código.
const express = require('express'); // <- Importa el módulo express, el framework que usamos para crear nuestro servidor web y definir rutas HTTP.
const cors = require('cors'); // <- Importa el middleware cors que permite solicitudes entre diferentes dominios. Muy útil cuando el frontend y backend no están en el mismo servidor.
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/auth.routes');
const cropRoutes = require('./routes/crop.routes');
const cycleRoutes = require('./routes/cycle.routes');
const sensorRoutes = require('./routes/sensor.routes');
const consumableRoutes = require('./routes/consumable.routes');
const ProductionRoutes = require('./routes/productions.routes');
const sensorReadingsRoutes = require('./routes/sensorReadings.routes');

const app = express(); // <- Crea la instancia principal de Express, que se usa para configurar middlewares, rutas, etc.
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // <- para ver las peticiones en consola, pro ejemplo GET /api/users 200 15.234 ms - 324 , POST /api/auth/login 401 8.432 ms - 45
app.use('/api/auth', userRoutes);
app.use('/api/crops', cropRoutes); // Para gestión de formularios y API REST
app.use('/', cropRoutes); //             Para endpoints públicos como /integrador
app.use('/api/cycle', cycleRoutes); // Para gestión de formularios y API REST
app.use('/api/sensor', sensorRoutes); // Para gestión de formularios y API REST
app.use('/api/consumable', consumableRoutes); // Para gestión de formularios y API REST
app.use('/api/production', ProductionRoutes); // Para gestión de formularios y API REST
app.use('/api/sensor-readings', sensorReadingsRoutes); 
app.use('/uploads-sensor', express.static(path.join(__dirname, '../uploads-sensor')));
app.use('/uploads-crop', express.static(path.join(__dirname, '../uploads-crop')));
// app.use(errorHandler);
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


