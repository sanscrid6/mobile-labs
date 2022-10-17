import React from 'react';
import {StyleSheet} from 'react-native';
import {defaultSettings} from '../constants/constants';

export const createStyles = payload => {
  console.log(payload);
  return StyleSheet.create({
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    textCenter: {
      fontSize: payload.fontSize,
      textAlign: 'center',
      textAlignVertical: 'center',
    },

    text: {
      fontSize: payload.fontSize,
    },
  });
};

// let styles = createStyles(defaultSettings);
//
// export default styles;
