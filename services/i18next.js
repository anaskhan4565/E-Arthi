import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ur from '../locales/urdu.json';
import sin from '../locales/sin.json';
import psh from '../locales/pashto.json';
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
    sin: { translation: sin },
    psh: { translation: psh },
  },
  lng: 'ur', // Default language
  fallbackLng: 'ur',
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});
export default i18n;
