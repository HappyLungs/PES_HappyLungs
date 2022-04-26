import { DangerZone } from "expo";
const { Localization } = DangerZone;

const LOCALIZED_STRINGS = {
	en: { title: "Hello", subtitle: "Welcome" },
	es: { title: "Hola", subtitle: "Bienvenido" },
};

const localeStore = new Localization.LocaleStore(LOCALIZED_STRINGS);
export default localeStore;
