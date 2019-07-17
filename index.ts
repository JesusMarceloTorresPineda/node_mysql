import Server from './classes/server';
import { SERVER_PORT } from './global/environment';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const dbConnection = require('./config/ConfigDatabase');
const server = Server.instance;
const connection = dbConnection();
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json());
//Rutas de Servicio
server.app.use('/',router);
//Configuración de los cors
server.app.use(cors({origin: true, credentials:true}));

server.start(()=>{
    connection.connect(function(error: any){
        if(error){
            console.log('Conexion incorrecta.');
        }else{
           console.log('Conexion correcta.');
        }
     });
    console.log(`Servidor Corriendo en el puerto ${SERVER_PORT}`);
})

