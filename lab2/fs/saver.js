import {Dirs, FileSystem} from 'react-native-file-access';

export default new (class Saver {
  async save(path, data) {
    await FileSystem.writeFile(path, JSON.stringify(data));
  }

  async append(path, data) {
    await FileSystem.appendFile(path, JSON.stringify(data));
  }

  async delete(path) {
    await FileSystem.unlink(path);
  }

  async read(path) {
    await FileSystem.readFile(path, 'utf8');
  }

  async exists(path) {
    await FileSystem.exists(path);
  }
})();
