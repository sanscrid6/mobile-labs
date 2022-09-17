import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

function Copy({source}) {
  return (
    <TouchableOpacity onPress={() => Clipboard.setString(String(source))}>
      <Image
        source={require('../public/content-copy.png')}
        style={{
          tintColor: 'black',
          width: 20,
          height: 20,
        }}
      />
    </TouchableOpacity>
  );
}

export default Copy;
