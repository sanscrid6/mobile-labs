import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import Key from '../components/Key';
import DropDown from '../components/DropDown';
import Copy from '../components/Copy';
import {Image} from 'native-base';
import Config from 'react-native-config';
import BuildConfig from 'react-native-build-config';
import Big from 'big.js';
Big.DP = 100000;
Big.PE = 100000;

const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const clamp = (val, min, max) => {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
};

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
  const commonUnit = originalVal.times(originalMeasure.toCommon);
  const result = commonUnit.div(convertedMeasure.toCommon);
  return result;
};

function ConvertScreen() {
  const [converted, setConverted] = useState(0);
  const [original, setOriginal] = useState([0]);
  const [unit, setUnit] = useState(units[0]);
  const [caretPos, setCaretPos] = useState(1);

  const [originalMeasure, setOriginalMeasure] = useState(
    units[0].measurements[0],
  );
  const [convertedMeasure, setConvertedMeasure] = useState(
    units[0].measurements[1],
  );

  useEffect(() => {
    console.log(BuildConfig, 'env');
    const originalVal = new Big(original.join(''));

    setConverted(convert(originalMeasure, convertedMeasure, originalVal));
  }, [convertedMeasure, original, originalMeasure]);

  useEffect(() => {
    setOriginalMeasure(unit.measurements[0]);
    setConvertedMeasure(unit.measurements[1]);

    const originalVal = new Big(original.join(''));

    setConverted(convert(originalMeasure, convertedMeasure, originalVal));
  }, [unit]);

  const handlePress = (num, action) => {
    switch (action) {
      case ACTIONS.ADD:
        if (original.includes('.') && num === '.') {
          return;
        }
        setOriginal([...original, num]);
        setCaretPos(clamp(caretPos + 1, 1, original.length + 1));
        break;

      case ACTIONS.REMOVE:
        if (original.length === 1 && original[0] === 0) {
          return;
        }

        if (caretPos === 1) {
          return;
        }

        original.splice(caretPos - 1, 1);
        setCaretPos(clamp(caretPos - 1, 1, original.length));

        if (original.length === 0) {
          original.push(0);
        }
        setOriginal([...original]);
        break;
    }
  };

  const renderOriginal = (withCaret = false) => {
    let renderVal = [];
    if (withCaret) {
      renderVal = [...original];
      renderVal.splice(caretPos, 0, '|');
    } else {
      renderVal = original;
    }

    return original[0] === 0 && original[1] !== '.' && original[1] !== undefined
      ? renderVal.slice(1, renderVal.length).join('')
      : renderVal.join('');
  };

  const swap = () => {
    const newOriginal = convertedMeasure;
    const newConverted = originalMeasure;

    setOriginalMeasure(newOriginal);
    setConvertedMeasure(newConverted);
  };

  const setPaste = source => {
    try {
      const num = new Big(source);
      setOriginal(Array.from(num.toString()));
      setCaretPos(original.length);
    } catch (e) {
      console.log(e, source);
      return;
    }
  };

  const moveLeftCaret = () => {
    setCaretPos(clamp(caretPos - 1, 1, original.length));
  };
  const moveRightCaret = () => {
    setCaretPos(clamp(caretPos + 1, 1, original.length));
  };

  return (
    <View
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
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
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {BuildConfig.FLAVOR === 'premium' && (
              <TouchableOpacity onPress={swap}>
                <Image
                  source={require('../public/swap-horizontal.png')}
                  style={{
                    tintColor: 'black',
                    width: 20,
                    height: 20,
                  }}
                  alt={'swap'}
                />
              </TouchableOpacity>
            )}
          </View>
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

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            maxWidth: '90%',
          }}>
          Original: {renderOriginal(true)}
        </Text>
        {BuildConfig.FLAVOR === 'premium' && (
          <Copy source={renderOriginal()} setPaste={setPaste} />
        )}
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            maxWidth: '90%',
          }}>
          {' '}
          Converted: {converted.toString()}
        </Text>
        {BuildConfig.FLAVOR === 'premium' && (
          <Copy source={converted.toString()} />
        )}
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
          <Key
            onPress={() => {
              moveLeftCaret();
            }}
            text={'arrow left'}
          />
          <Key
            onPress={() => {
              moveRightCaret();
            }}
            text={'arrow right'}
          />
        </>
      </View>

      <View>
        <Text style={{fontSize: 9, color: 'black', textAlign: 'center'}}>
          {BuildConfig.FLAVOR} v
          {`${BuildConfig.MAJOR}.${BuildConfig.MINOR}.${BuildConfig.PATCH}`}
        </Text>
      </View>
    </View>
  );
}

export default ConvertScreen;
