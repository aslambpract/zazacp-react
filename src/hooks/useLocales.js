import { useTranslation } from "react-i18next";
import EnglishIcon from "src/images/english.png";
import Portugal from "src/images/portugal.png";
import Spanish from "src/images/spanish.png";

import { useEffect, useState } from "react";

const LANGS = [
  {
    label: "English",
    value: "en",
    icon: "/assets/icons/flags/ic_flag_en.svg",
  },
  {
    label: "Spanish",
    value: "es",
    icon: "/assets/icons/flags/ic_flag_sp.svg",
  },
  {
    label: "Portuguese",
    value: "pt",
    icon: "/assets/icons/flags/ic_flag_pt.svg",
  },
  {
    label: "German",
    value: "de",
    icon: "/assets/icons/flags/ic_flag_de.svg",
  },
  {
    label: "Japan",
    value: "ja",
    icon: "/assets/icons/flags/ic_flag_jp.svg",
  },
];
export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const [currentLang, setCurrentLang] = useState(() => {
    const langStorage = localStorage.getItem("i18nextLng");
    if (langStorage) {
      const selectedLanguage = LANGS.find(
        (_lang) => _lang.value === langStorage
      );
      if (selectedLanguage) {
        i18n.changeLanguage(langStorage);
        return selectedLanguage;
      }
    }
    return LANGS[0];
  });

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  useEffect(() => {
    localStorage.setItem("i18nextLng", i18n.language);
    const selectedLanguage = LANGS.find(
      (_lang) => _lang.value === i18n.language
    );
    setCurrentLang(selectedLanguage);
  }, [i18n.language]);
  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
