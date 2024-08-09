// import { useEffect } from "react";

import { en,ar } from "./languages";

export let lang = "ar"
if(localStorage.getItem("languages") && localStorage.languages !== null) {
    lang = localStorage.languages
}



export default function Languages() {
    if(lang === "en") {
        return en;
     } else if(lang === "ar") {
         return ar;
     } else {
         return en;
     }

}


export function setLang(l) {
    lang = l;
    localStorage.languages = lang;
    Languages();
}