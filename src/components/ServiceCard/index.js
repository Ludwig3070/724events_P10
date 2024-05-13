import PropTypes from "prop-types"; // Import de PropTypes pour la validation des types de propriétés

import "./style.scss"; // Import des styles du composant

const ServiceCard = ({ imageSrc, imageAlt, children }) => ( // Composant ServiceCard prenant trois propriétés : imageSrc, imageAlt et children
    <div className="ServiceCard"> {/* Conteneur principal du composant */}
      <div className="ServiceCard__imageContainer"> {/* Conteneur de l'image */}
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} /> {/* Image */}
      </div>
      <div className="ServiceCard__textContainer">{children}</div> {/* Conteneur du texte enfant */}
    </div>
);

ServiceCard.propTypes = { // Validation des types de propriétés
  imageSrc: PropTypes.string.isRequired, // imageSrc doit être une chaîne de caractères obligatoire
  imageAlt: PropTypes.string, // imageAlt peut être une chaîne de caractères optionnelle
  children: PropTypes.node.isRequired, // children doit être un nœud React obligatoire
};

ServiceCard.defaultProps = { // Définition des valeurs par défaut des propriétés
  imageAlt: "image" // Par défaut, imageAlt est "image"
}

export default ServiceCard; // Export du composant ServiceCard
