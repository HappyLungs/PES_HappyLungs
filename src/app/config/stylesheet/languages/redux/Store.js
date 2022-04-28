import { combineReducers } from "redux";
import languageReducer from "./LanguageReducer";

const rootReducer = combineReducers({
	language: languageReducer,
});

export default rootReducer;
