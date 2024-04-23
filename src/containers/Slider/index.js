
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData(); /* destructuration de useData,recuperation de data (events.json) */
  const [index, setIndex] = useState(0);

  /* data?.focus : Utilisation de l'opérateur de faculté optionnelle (?.) pour accéder à la propriété focus de l'objet data. Cela permet de s'assurer que data est défini avant d'accéder à focus. Si data est null ou undefined, byDateDesc sera également null ou undefined. */

  /* sort((evtA, evtB) => new Date(evtA.date) < new Date(evtB.date) ? -1 : 1) : C'est la fonction de tri qui prend deux événements evtA et evtB comme arguments.
new Date(evtA.date) < new Date(evtB.date) : Compare les dates des événements. Il crée des objets Date à partir des valeurs de date des événements evtA et evtB et les compare pour déterminer l'ordre de tri.
Si evtA.date est antérieur à evtB.date, cela retourne true, sinon cela retourne false.
Si la comparaison retourne true, cela signifie que evtA doit être placé avant evtB dans le tri. Dans ce cas, la fonction retourne -1.
Si la comparaison retourne false, cela signifie que evtB doit être placé avant evtA dans le tri. Dans ce cas, la fonction retourne 1. */

/* Le résultat final, byDateDesc, est un tableau trié par date dans l'ordre décroissant. Si data?.focus est null ou undefined, byDateDesc sera également null ou undefined.
Ce tableau contient uniquement des objets focus trié par date croissante  */
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );


  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),/* ajout de -1 a length */
      5000
    );
    /* console.log(index) */
  };
  useEffect(() => {
    nextCard();
    
  },[nextCard]);/* AJOUT DU TABLEAU DES DEPENDANCES */
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={idx} /*une erreur en moins dans la console   */ 
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >          
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>                           
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (                
                <input
                  key={radioIdx} /* une erreur en moins dans la console    */            
                  type="radio"
                  name="radio-button"
                 defaultChecked={idx === radioIdx} /* checked devient defaultChecked */
                />
                
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
