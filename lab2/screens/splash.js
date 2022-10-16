import React, { useEffect } from "react";
import {Text, View} from 'react-native';

function Splash({navigation}) {

  useEffect(() => {
    const init = async () => {
      await new Promise(rs => setTimeout(rs, 2000));
      navigation.replace('Main');
    };

    init();
  }, []);

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          height: '100%',
        }}>
        <Text style={{textAlign: 'center', fontSize: 35}}>Parasha timer</Text>
        <Text style={{textAlign: 'center'}}>loading...</Text>
      </View>
    </>
  );
}

export default Splash;
