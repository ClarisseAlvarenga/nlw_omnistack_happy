import express from 'express';
import 'express-async-errors'
import './database/connection' //conexão com o banco de dados;
import routes from './routes';
import errorHandler from '../src/errors/handler'
import path from 'path';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));
app.use(errorHandler);  



app.listen(3333);

//explicações
//Rota = conjunto
//Recxurso = usuário
//Métodos HTTP = GET, POST, PUT, DELETE
//Parâmetros - Query/Route/Body
//console.log(request.query);
//console.log(request.params);
//console.log(request.body);