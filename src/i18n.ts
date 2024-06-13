import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './locales/en.json';
import ruJSON from './locales/ru.json';
import uaJSON from './locales/ua.json';

i18n.use(initReactI18next).init({
  fallbackLng: ['en', 'ru', 'ua'],
  resources: {
    en: { translation: enJSON },
    ru: { translation: ruJSON },
    ua: { translation: uaJSON },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
