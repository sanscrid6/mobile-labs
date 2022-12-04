import { queryAsync } from "../db/Db.js";

export async function createRoom() {
  const query = `CREATE TABLE IF NOT EXISTS Room(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tableState TEXT,
    roomState ENUM("ended","playing","waitingForPlayer") 
  );`;
  await queryAsync(query);
}

export async function getAvailableRoomOrCreateNew(){

}

export async function updateTableState(){

}

export async function updateRoomState(){

}
