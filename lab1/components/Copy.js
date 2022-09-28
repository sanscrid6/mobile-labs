import React from 'react';
import { Image, TouchableOpacity, View } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';

function Copy({source, setPaste}) {
  const handlePaste = async () => {
    if (!setPaste) {
      return;
    }
    const paste = await Clipboard.getString();
    setPaste(paste);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => Clipboard.setString(String(source))}>
        <Image
          source={require('../public/content-copy.png')}
          style={{
            marginBottom: 5,
            tintColor: 'black',
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      {setPaste && <TouchableOpacity onPress={async () => await handlePaste()}>
        <Image
          source={require('../public/content-paste.png')}
          style={{
            tintColor: 'black',
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
        }
        </View>

  );
}

export default Copy;
