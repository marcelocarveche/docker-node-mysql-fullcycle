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

app.get('/', async (req, res) => {
    const connection = await mysql.createConnection(config);

    connection.connect((e) => {
        if (e) {
            return console.error('Erro ao conectar ao banco de dados:', e);
        }

        console.log('Conectado ao banco de dados.');
        
        connection.query(`
            CREATE TABLE IF NOT EXISTS people (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255),
                PRIMARY KEY (id)
            )
        `);

        connection.query(`
            INSERT INTO people(name) VALUES('Carveche')
        `);

        connection.query(`SELECT * FROM people`, (err, result) => {
            if (err) {
                return console.error('Erro ao consultar tabela:', err);
            }

            res.send(`<h1>Full Cycle Rocks!</h1> </br> ${result.map((r) => `<p>${r.name}</p>`).join('')}`);

            console.log(result)
        })

        connection.end();
    })
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
})