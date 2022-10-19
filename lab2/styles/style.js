import React from 'react';
import {StyleSheet} from 'react-native';
import {defaultSettings, THEME} from '../constants/constants';

export const createStyles = payload => {
  return StyleSheet.create({
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    viewBg: {
      backgroundColor: payload.theme === THEME.DAY ? 'white' : '#000000',
      height: '100%',
    },

    textCenter: {
      color: payload.theme === THEME.DAY ? '#000000' : 'white',
      fontSize: payload.fontSize,
      textAlign: 'center',
      textAlignVertical: 'center',
    },

    icon: {
      //color: ,
      //filter: invert(100%)
    },

    text: {
      fontSize: payload.fontSize,
      color: payload.theme === THEME.DAY ? '#000000' : 'white',
    },
  });
};

// let styles = createStyles(defaultSettings);
//
// export default styles;
