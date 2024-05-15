import PropTypes from "prop-types";
import "./style.scss";

// Types de boutons disponibles
export const BUTTON_TYPES = {
  DEFAULT: 1,
  SUBMIT: 2,
};

// Composant Button
const Button = ({ title, onClick, type, disabled, children }) => {
  // Logique de rendu en fonction du type de bouton
  switch (type) {
    case BUTTON_TYPES.DEFAULT:
      // Rendu d'un bouton par défaut
      return (
        <button
          type="button"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          title={title}
        >
          {children}
        </button>
      );
    case BUTTON_TYPES.SUBMIT:
      // Rendu d'un bouton de type submit
      return (
        <input
          disabled={disabled}
          className="Button"
          type="submit"
          data-testid="button-test-id"
          value={children}
          onClick={onClick}
          title={title}
        />
      );
    default:
      // Rendu par défaut d'un bouton
      return (
        <button
          type="button"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          title={title}
        >
          {children}
        </button>
      );
  }
};

// Définition des types de props
Button.propTypes = {
  title: PropTypes.string, // Titre du bouton (pour l'infobulle)
  onClick: PropTypes.func, // Fonction à exécuter lors du clic sur le bouton
  type: PropTypes.number, // Type de bouton (parmi les valeurs de BUTTON_TYPES)
  disabled: PropTypes.bool, // Indique si le bouton est désactivé
  children: PropTypes.node, // Contenu du bouton
};

// Définition des valeurs par défaut des props
Button.defaultProps = {
  disabled: false, // Par défaut, le bouton n'est pas désactivé
  onClick: () => null, // Par défaut, aucune fonction n'est exécutée lors du clic sur le bouton
  type: BUTTON_TYPES.DEFAULT, // Par défaut, le type de bouton est DEFAULT
  title: "", // Par défaut, pas de titre
  children: null // Par défaut, pas de contenu dans le bouton
};

export default Button;
