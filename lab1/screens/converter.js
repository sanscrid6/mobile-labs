import React, {useState} from 'react';
import {Dimensions, Text, TouchableHighlight, View} from 'react-native';
import Key from '../components/key';

const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

function Converter() {
  const [converted, setConverted] = useState(0);
  const [original, setOriginal] = useState([]);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const handlePress = (num, action) => {
    switch (action) {
      case ACTIONS.ADD:
        if (original.includes('.') && num === '.') {
          return;
        }
        setOriginal([...original, num]);
        break;
      case ACTIONS.REMOVE:
        if (original.length === 0) {
          return;
        }

        original.splice(original.length - 1, 1);
        setOriginal([...original]);
        break;
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column', // inner items will be added vertically
        justifyContent: 'space-between',
      }}>
      <View>
        <Text>Original: {original.length === 0 ? '0' : original.join('')}</Text>
      </View>

      <View>
        <Text> Converted: {converted}</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <>
          {numbers.map(num => (
            <Key
              key={num}
              onPress={() => handlePress(num, ACTIONS.ADD)}
              text={num}
            />
          ))}

          <Key onPress={() => handlePress('.', ACTIONS.ADD)} text={'.'} />
          <Key onPress={() => handlePress('', ACTIONS.REMOVE)} text={'<-'} />
        </>
      </View>
    </View>
  );
}

export default Converter;
