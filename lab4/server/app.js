import express from 'express';
import { connectAsync, queryAsync } from "./core/db/Db.js";
import { createRoom } from "./core/room/roomRepository.js";
const app = express();
const port = process.env.PORT;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  console.log('req');
  res.json({aboba: 'aboba'});
});

const main = async () => {
  await connectAsync();
  await queryAsync(`use ${process.env.DB_NAME};`);
  await createRoom();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
