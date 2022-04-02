import React from "react";
import {language} from "../util/const";

const LangContext = React.createContext(null);

const LangProvider = ({children}) => {
    const [lang, setLang] = React.useState(language);
    const [languageType, setLanguageType] = React.useState(window.localStorage.getItem('_curr_lang_type_') || 'uz');

    React.useEffect(() => {
        window.localStorage.setItem('_curr_lang_type_', languageType)
        console.log(languageType)
        console.log(lang)

    }, [languageType])

    return <LangContext.Provider value={{lang, setLang, languageType, setLanguageType}}>
                {children}
            </LangContext.Provider>
}

export {LangProvider, LangContext};