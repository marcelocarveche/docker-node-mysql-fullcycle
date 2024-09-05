import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;


const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

try {
    const connection = mysql.createConnection(config)
    // connection.query(`CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key(id))`);
    // connection.query(`INSERT INTO people(name) values('Carveche')`);
    connection.query(`SELECT * FROM people`, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
    connection.end();
} catch (error) {
    console.log("Erro ao conectar com o banco de dados: ", error);
}

app.get('/', (req, res) => {
    res.send('Desenvolvimento com Docker & NodeJS');
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
})