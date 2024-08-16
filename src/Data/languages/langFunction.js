import { en,ar } from "./languages";
// get type languages
export let lang = "en"
if(localStorage.getItem("languages") && localStorage.languages !== null) {
    lang = localStorage.languages
}

// access data
export default function Languages() {
    if(lang === "en") {
        return en;
     } else if(lang === "ar") {
         return ar;
     } else {
         return en;
     }

}

// change languages
export function setLang(languagesNew) {
    lang = languagesNew;
    localStorage.languages = lang;
    Languages();
}