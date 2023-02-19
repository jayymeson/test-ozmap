const sqlite = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
          )`,
    (err) => {
      if (err) {
        console.log('A tabela de usuários já existe.');
      } else {
        console.log('Tabela de usuários criada com sucesso!');
      }
    });
  }
});

module.exports = db;
