import {$settings, $styles} from './store';
import {setStyles, updateSettings} from './events';
import {createStyles} from '../styles/style';

function init() {
  $settings.on(updateSettings, (state, data) => {
    const newSettings = {...state, ...data};
    return newSettings;
  });

  $styles.on(setStyles, (state, data) => data);

  $settings.updates.watch(({fontSize}) => {
    setStyles(createStyles({fontSize}));
  });
}

export default init;
