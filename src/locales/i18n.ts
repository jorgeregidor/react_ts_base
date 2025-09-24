import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import languajes from './languajes';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //debug: true,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    resources: languajes
  });

export default i18n;