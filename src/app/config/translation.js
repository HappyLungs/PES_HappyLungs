import i18n from "i18n-js";
import * as Localization from "expo-localization";
import { ca, en, es } from "../config/languages";
i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = { ca, en, es };
i18n.locale = Localization.locale;

//export function setLanguage(lang) {
//	i18n.locale = lang;
//}
//i18n.locale = Localization.locale;
export default i18n;
