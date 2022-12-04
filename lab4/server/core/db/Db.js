import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function queryAsync(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, async (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export async function connectAsync() {
  return new Promise((resolve, reject) => {
    connection.connect(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
