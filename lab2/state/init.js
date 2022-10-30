import {$editingTimer, $settings, $styles, $timers} from './store';
import {
  setStyles,
  updateSettings,
  setTimers,
  setSettings,
  setEditingTimer,
  updateEditingTimer,
} from './events';
import {createStyles} from '../styles/style';
import Saver from '../fs/saver';

function init() {
  $settings.on(updateSettings, (state, data) => {
    const newSettings = {...state, ...data};
    return newSettings;
  });
  $settings.updates.watch(({fontSize, theme}) => {
    setStyles(createStyles({fontSize, theme}));
  });
  $settings.on(setSettings, (state, data) => data);

  $styles.on(setStyles, (state, data) => data);

  $timers.on(setTimers, (state, data) => data);
  $timers.updates.watch(
    async timers => await Saver.save('timers.json', timers),
  );
  $timers.updates.watch(t => console.log(t));

  $editingTimer.on(setEditingTimer, (state, data) => data);
  $editingTimer.on(updateEditingTimer, (state, data) => {
    return {...state, ...data};
  });
}

export default init;
