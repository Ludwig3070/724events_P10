export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};



export const getMonth = (date) => MONTHS[date.getMonth()+1];
/* ici il ne faut pas confondre la constante retournée getMonth et la methode de l'objet date qui porte le meme nom */


/* pour utiliser le module, un exemple */

/* import { getMonth } from './DataUtils';

const dateString = "2022-03-29T20:28:45.744Z";
const date = new Date(dateString);
const monthName = getMonth(date);
console.log(monthName); // Affichera "mars" */