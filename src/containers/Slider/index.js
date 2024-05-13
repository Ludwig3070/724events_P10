import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0); // État pour suivre l'index de la diapositive active

  // Trie les événements par date dans l'ordre décroissant
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    if (byDateDesc && byDateDesc.length > 0) {
      // Si byDateDesc est défini et non vide
      const timer = setInterval(() => {
        // Change de diapositive toutes les 5 secondes
        setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
      }, 5000);

      return () => {
        clearInterval(timer); // Nettoie le timer lorsque le composant est démonté
      };
    }
  }, [byDateDesc]); // Appelé lorsque byDateDesc change

  // Fonction appelée lors du clic sur un bullet pour changer l'index de la diapositive active
  const handleBulletClick = (bulletIdx) => {
    setIndex(bulletIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}// Si l'index de la diapositive correspond à l'index actif (celui qui est affiché), la classe SlideCard--display est ajoutée.
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
      ))}
      {/* Affichage des bullets */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* Génère un bullet pour chaque événement */}
          {byDateDesc?.map((ev, bulletIdx) => (                
            <input
              key={ev.date}
              type="radio"
              name="radio-button"
              checked={index === bulletIdx} // Vérifie si le bullet correspond à l'indice actuel, decoche le bullet si false
              onChange={() => handleBulletClick(bulletIdx)} // Met à jour l'index lors du clic sur un bullet
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
