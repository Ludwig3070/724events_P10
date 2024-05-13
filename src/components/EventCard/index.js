import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date"; // Importe la fonction getMonth pour obtenir le mois à partir de la date
import "./style.scss"; // Importe le fichier de style SCSS

const EventCard = ({
  imageSrc, // Source de l'image
  imageAlt, // Texte alternatif de l'image
  date = new Date(), // Date de l'événement, par défaut la date actuelle
  title, // Titre de l'événement
  label, // Étiquette de l'événement
  small = false, // Indicateur pour une carte d'événement de taille réduite, par défaut à false
  ...props // Autres propriétés passées au composant
}) => {
  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`} // Ajoute la classe EventCard--small si small est true
      {...props} // Propage les autres propriétés non déstructurées
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />{" "}
        {/* Image de l'événement */}
        <div className="EventCard__label">{label}</div>{" "}
        {/* Étiquette de l'événement */}
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>{" "}
        {/* Titre de l'événement */}
        <div className="EventCard__month">{getMonth(date)}</div>{" "}
        {/* Affiche le mois de la date de l'événement */}
      </div>
    </div>
  );
};

// Définit les types des propriétés attendues par le composant
EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired, // Source de l'image (chaîne obligatoire)
  imageAlt: PropTypes.string, // Texte alternatif de l'image (chaîne, par défaut "image")
  date: PropTypes.instanceOf(Date).isRequired, // Date de l'événement (instance de Date obligatoire)
  title: PropTypes.string.isRequired, // Titre de l'événement (chaîne obligatoire)
  small: PropTypes.bool, // Indicateur pour une carte d'événement de taille réduite (booléen, par défaut false)
  label: PropTypes.string.isRequired, // Étiquette de l'événement (chaîne obligatoire)
};

// Définit les valeurs par défaut des propriétés
EventCard.defaultProps = {
  imageAlt: "image", // Texte alternatif de l'image par défaut
  small: false, // Par défaut, la carte n'est pas petite  
};

export default EventCard; // Exporte le composant EventCard
