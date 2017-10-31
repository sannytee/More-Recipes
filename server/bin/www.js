import dotenv from 'dotenv';
import http from 'http';
import app from '../app';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);


const server = http.createServer(app);
server.listen(port);
