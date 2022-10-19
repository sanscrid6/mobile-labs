import {$settings, $styles, $timers} from './store';
import {setStyles, updateSettings, setTimers, setSettings} from './events';
import {createStyles} from '../styles/style';

function init() {
  $settings.on(updateSettings, (state, data) => {
    const newSettings = {...state, ...data};
    return newSettings;
  });

  $styles.on(setStyles, (state, data) => data);

  $settings.updates.watch(({fontSize, theme}) => {
    setStyles(createStyles({fontSize, theme}));
  });

  $timers.on(setTimers, (state, data) => data);
  $settings.on(setSettings, (state, data) => data);
}

export default init;
