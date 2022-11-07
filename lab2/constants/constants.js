export const SCREENS = {
  SPLASH: 'SPLASH',
  SETTINGS: 'SETTINGS',
  MAIN: 'MAIN',
  EDIT: 'EDIT',
  PLAY: 'PLAY',
};

export const LANGUAGES = {
  EN: 'EN',
  RU: 'RU',
};

export const THEME = {
  DAY: 'DAY',
  NIGHT: 'NIGHT',
};

export const defaultSettings = {
  fontSize: 15,
  language: LANGUAGES.EN,
  theme: THEME.DAY,
};

export const defaultTimer = {
  intervals: 0,
  restDuration: 12,
  workDuration: 12,
  title: '',
  color: 'white',
};

export const TICK_TIME = 500;

export const INTERVAL_STATE = {
  WORK: 'WORK',
  REST: 'REST',
};

export const localization = {
  changeFontSize: {
    [LANGUAGES.EN]: 'Change font size',
    [LANGUAGES.RU]: 'Изменить размер шрифта',
  },
  changeTheme: {
    [LANGUAGES.EN]: 'Switch theme',
    [LANGUAGES.RU]: 'Изменить тему',
  },
  day: {
    [LANGUAGES.EN]: 'Day',
    [LANGUAGES.RU]: 'День',
  },
  night: {
    [LANGUAGES.EN]: 'Night',
    [LANGUAGES.RU]: 'Ночь',
  },
  deleteAllData: {
    [LANGUAGES.EN]: 'Delete all data',
    [LANGUAGES.RU]: 'Удалить все данные',
  },
  saveSettings: {
    [LANGUAGES.EN]: 'Save settings',
    [LANGUAGES.RU]: 'Сохранить настрйки',
  },
  save: {
    [LANGUAGES.EN]: 'Save',
    [LANGUAGES.RU]: 'Сохранить',
  },
  intervals: {
    [LANGUAGES.EN]: 'Intervals',
    [LANGUAGES.RU]: 'Интервалы',
  },
  restDuration: {
    [LANGUAGES.EN]: 'Rest duration',
    [LANGUAGES.RU]: 'Длительность отдыхa',
  },
  workDuration: {
    [LANGUAGES.EN]: 'Work duration',
    [LANGUAGES.RU]: 'Длительность подхода',
  },
  title: {
    [LANGUAGES.EN]: 'Title',
    [LANGUAGES.RU]: 'Название',
  },
  edit: {
    [LANGUAGES.EN]: 'Edit',
    [LANGUAGES.RU]: 'Редактировать',
  },
  delete: {
    [LANGUAGES.EN]: 'Delete',
    [LANGUAGES.RU]: 'Удалить',
  },
  create: {
    [LANGUAGES.EN]: 'Create',
    [LANGUAGES.RU]: 'Создать',
  },
  play: {
    [LANGUAGES.EN]: 'Play',
    [LANGUAGES.RU]: 'Старт',
  },
  stop: {
    [LANGUAGES.EN]: 'Stop',
    [LANGUAGES.RU]: 'Стоп',
  },
  pause: {
    [LANGUAGES.EN]: 'Pause',
    [LANGUAGES.RU]: 'Пауза',
  },
};
