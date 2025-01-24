import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ur from '../locales/urdu.json';
import sin from '../locales/sin.json';
import ps from '../locales/pashto.json';
import bl from '../locales/balochi.json';
import pa from '../locales/punjabi.json';
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
    sin: { translation: sin },
    ps: { translation: ps },
    pa: { translation: pa },
    bl: { translation: bl },

  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
