import {Dirs, FileSystem} from 'react-native-file-access';
import RNFS from 'react-native-fs';

export default new (class Saver {
  async save(path, data) {
    return RNFS.writeFile(
      RNFS.DocumentDirectoryPath + path,
      JSON.stringify(data),
      'utf8',
    );
  }

  async append(path, data) {
    await FileSystem.appendFile(path, JSON.stringify(data));
  }

  async delete(path) {
    return RNFS.unlink(RNFS.DocumentDirectoryPath + path);
  }

  async read(path) {
    return RNFS.readFile(RNFS.DocumentDirectoryPath + path, 'utf8');
  }

  async exists(path) {
    await RNFS.exists(path);
  }
})();
