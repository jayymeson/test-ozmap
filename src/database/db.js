const sqlite = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    // console.log('Conectado ao banco de dados SQLite.');
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            img TEXT
          )`,
      (err) => {
        if (err) {
          // console.log('A tabela de usuários já existe.');
        } else {
          console.log("Tabela de usuários criada com sucesso!");
        }
      }
    );
  }
});

const getAllUsers = () => {
  const sql = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getUserById = (id) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.get(sql, id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = { db, getAllUsers, getUserById, all: db.all };
