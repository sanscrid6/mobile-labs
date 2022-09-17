import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Key from '../components/Key';
import DropDown from '../components/DropDown';

const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const units = [
  {
    name: 'weight',
    measurements: [
      {name: 'kg', toCommon: 1},
      {name: 'g', toCommon: 0.001},
      {name: 'mg', toCommon: 0.000001},
    ],
    common: 'kg',
  },
  {
    name: 'distance',
    measurements: [
      {name: 'km', toCommon: 1000},
      {name: 'm', toCommon: 1},
      {name: 'sm', toCommon: 0.001},
    ],
    common: 'm',
  },
  {
    name: 'information',
    measurements: [
      {name: 'mb', toCommon: 1},
      {name: 'kb', toCommon: 0.001},
      {name: 'gb', toCommon: 1000},
    ],
    common: 'mb',
  },
];

const convert = (originalMeasure, convertedMeasure, originalVal) => {
  const commonUnit = originalMeasure.toCommon * originalVal;
  return commonUnit / convertedMeasure.toCommon;
};

function ConvertScreen() {
  const [converted, setConverted] = useState(0);
  const [original, setOriginal] = useState([0]);
  const [unit, setUnit] = useState(units[0]);

  const [originalMeasure, setOriginalMeasure] = useState(
    units[0].measurements[0],
  );
  const [convertedMeasure, setConvertedMeasure] = useState(
    units[0].measurements[1],
  );

  useEffect(() => {
    const originalVal = Number(original.join(''));

    if (Number.isNaN(originalVal)) {
      return;
    }

    setConverted(convert(originalMeasure, convertedMeasure, originalVal));
  }, [convertedMeasure, original, originalMeasure]);

  const handlePress = (num, action) => {
    switch (action) {
      case ACTIONS.ADD:
        if (original.includes('.') && num === '.') {
          return;
        }
        setOriginal([...original, num]);
        break;

      case ACTIONS.REMOVE:
        if (original.length === 1 && original[0] === 0) {
          return;
        }

        original.splice(original.length - 1, 1);

        if (original.length === 0) {
          original.push(0);
        }
        setOriginal([...original]);
        break;
    }
  };

  useEffect(() => {
    setOriginalMeasure(unit.measurements[0]);
    setConvertedMeasure(unit.measurements[1]);

    const originalVal = Number(original.join(''));

    if (Number.isNaN(originalVal)) {
      return;
    }

    setConverted(
      convert(unit.measurements[0], unit.measurements[1], originalVal),
    );
  }, [unit]);

  return (
    <View
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column', // inner items will be added vertically
        justifyContent: 'space-between',
        margin: 10,
      }}>
      <View>
        <DropDown
          items={units.map(unit => {
            return {value: unit.name, label: unit.name};
          })}
          selected={unit.name}
          onValueChanged={value => setUnit(units.find(u => u.name === value))}
          placeholder={'units'}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <DropDown
            items={unit.measurements.map(m => {
              return {value: m.name, label: m.name};
            })}
            selected={originalMeasure.name}
            onValueChanged={value =>
              setOriginalMeasure(unit.measurements.find(m => m.name === value))
            }
            placeholder={'original measure'}
          />
          <DropDown
            items={unit.measurements.map(m => {
              return {value: m.name, label: m.name};
            })}
            selected={convertedMeasure.name}
            onValueChanged={value =>
              setConvertedMeasure(unit.measurements.find(m => m.name === value))
            }
            placeholder={'converted measure'}
          />
        </View>
      </View>

      <View>
        <Text>
          Original:{' '}
          {original[0] === 0 && original[1] !== '.' && original[1] !== undefined
            ? original.slice(1, original.length).join('')
            : original.join('')}
        </Text>
      </View>

      <View>
        <Text> Converted: {converted.toFixed(4)}</Text>
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

export default ConvertScreen;
