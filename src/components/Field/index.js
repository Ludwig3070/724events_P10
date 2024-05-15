import PropTypes from "prop-types";
import "./style.scss";

// Types de champs disponibles
export const FIELD_TYPES = {
  INPUT_TEXT: 1, // Champ de saisie texte
  TEXTAREA: 2,   // Zone de texte multiligne
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder }) => {
  let component;

  // Sélection de l'élément de formulaire en fonction du type
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={name} data-testid="field-testid" />;
      break;
    default:
      // Par défaut, un champ de saisie texte est rendu
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
        />
      );
  }

  // Rendu du composant de champ de formulaire
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

// Validation des types de props
Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)), // Le type de champ doit être l'une des valeurs de FIELD_TYPES
  name: PropTypes.string, // Nom du champ
  label: PropTypes.string, // Étiquette du champ
  placeholder: PropTypes.string, // Placeholder du champ
};

// Valeurs par défaut des props
Field.defaultProps = {
  label: "", // Par défaut, pas de label
  placeholder: "", // Par défaut, pas de placeholder
  type: FIELD_TYPES.INPUT_TEXT, // Par défaut, champ de saisie texte
  name: "field-name", // Par défaut, nom du champ est "field-name"
};

export default Field;
