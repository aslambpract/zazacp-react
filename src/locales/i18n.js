import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLocales from "./en.json";
import esLocales from "./es.json";
import ptLocales from "./pt.json";
import deLocales from "./de.json";

i18n.use(initReactI18next).init({
  resources: {
    en: enLocales,
    es: esLocales,
    pt: ptLocales,
    de: deLocales,
  },
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
