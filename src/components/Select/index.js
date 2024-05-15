/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Désactive les avertissements liés à l'accessibilité pour les éléments non interactifs et les événements de clic sans événements de clavier

import { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss"; // Importe les styles du composant

const Select = ({
  selection,
  onChange,
  name,
  titleEmpty,
  label,
  type = "normal", // Par défaut, le type est "normal"
}) => {
  // Définition du composant Select
  const [value, setValue] = useState(); // État pour stocker la valeur sélectionnée
  const [collapsed, setCollapsed] = useState(true); // État pour gérer l'affichage rétracté ou déplié du sélecteur


  // Fonction pour changer la valeur sélectionnée
  const changeValue = (newValue) => {
    setValue(newValue); // Met à jour la valeur sélectionnée
    onChange(newValue); // Appelle la fonction onChange passée en props  MODIF 
    setCollapsed(true); // Rétracte le sélecteur
  };



  return (
    <div className={`SelectContainer ${type}`} data-testid="select-testid">
      {/* Div pour le conteneur du sélecteur */}
      {label && <div className="label">{label}</div>} {/* Affiche le label si fourni */}

      <div className="Select">
        {/* Div pour le sélecteur */}
        <ul>
          <li className={collapsed ? "SelectTitle--show" : "SelectTitle--hide"}>
            {/* Affiche la valeur sélectionnée ou "Toutes" si aucune valeur sélectionnée */}
            {value || (!titleEmpty && "Toutes")}
          </li>

          {!collapsed && (
            <>
              {/* Affiche l'option "Toutes" si titleEmpty est false */}
              {!titleEmpty && (
                <li onClick={() => changeValue(null)}>
                  {/* Input radio pour l'option "Toutes" */}
                  <input defaultChecked={!value} name="selected" type="radio" />{" "}
                  Toutes
                </li>
              )}

              {/* Affiche les options sélectionnables */}
              {selection.map((s) => ( //  Mappe chaque élément de la liste selection à un élément de liste <li> avec un input radio correspondant.
                <li key={s} onClick={() => changeValue(s)}> 
                { /* Crée un élément de liste pour chaque élément de selection. La prop key est utilisée pour l identification unique de chaque élément de liste. Lorsque cet élément de liste est cliqué, il déclenche la fonction changeValue avec s comme argument. */}
                  {/* Input radio pour chaque option */}
                  <input
                    defaultChecked={value === s}
                    name="selected"
                    type="radio"
                  />{" "}
                  {s}
                </li>
              ))}
            </>
          )}
        </ul>

        {/* Input hidden pour stocker la valeur sélectionnée , value et name sont des props passées au composant. Le champ <input> sera invisible sur la page mais quand le formulaire est soumis, il enverra les données définies par value avec le nom spécifié par name. */}
        <input type="hidden" value={value || ""} name={name} />

        {/* Bouton pour ouvrir/fermer le sélecteur */}
        <button
          type="button"
          data-testid="collapse-button-testid" // Un attribut pour tester l'élément dans les tests automatisés.
          className={collapsed ? "open" : "close"} // Ajoute la classe "open" si collapsed est true, sinon ajoute la classe "close". Ces classes sont utilisées pour appliquer des styles différents au bouton en fonction de son état.
          onClick={(e) => {
            e.preventDefault();
            setCollapsed(!collapsed);// change l'etat de collapsed au clic
          }}
        >
          {/* Icône de flèche SVG */}
          <Arrow />
        </button>
      </div>
    </div>
  );
};

// Composant pour l'icône de flèche
const Arrow = () => (
  <svg
    width="21"
    height="11"
    viewBox="0 0 21 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.2819 10.9843C10.213 10.9634 10.1408 10.9491 10.0741 10.9216C9.89304 10.8467 9.86193 10.8038 9.71304 10.6828L0.819902 1.87423C0.727682 1.76309 0.63435 1.64975 0.578794 1.5177C0.383244 1.05114 0.562128 0.462436 0.987675 0.180738C1.35211 -0.0602459 1.85877 -0.0602459 2.22321 0.180738C2.28432 0.220351 2.33542 0.272069 2.39209 0.317185L10.4997 8.34667L18.6062 0.317185L18.7751 0.180738C18.8395 0.146626 18.9006 0.107012 18.9673 0.0795026C19.4373 -0.114165 20.0284 0.057495 20.3173 0.484443C20.5606 0.845368 20.5606 1.34714 20.3173 1.70807C20.2761 1.76749 20.225 1.81921 20.1784 1.87423L11.2852 10.6828C11.2286 10.7279 11.1775 10.7796 11.1163 10.8192C10.9952 10.8996 10.8597 10.9557 10.7164 10.9843C10.5741 11.0118 10.4275 10.9975 10.2819 10.9843Z"
      fill="#5B32FF"
    />
  </svg>
);

// Définition des types de props attendus pour le composant Select
Select.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.string).isRequired, // Tableau de strings pour les options
  onChange: PropTypes.func, // Fonction appelée lors d'un changement de valeur
  name: PropTypes.string, // Nom du sélecteur
  titleEmpty: PropTypes.bool, // Booléen pour indiquer si "Toutes" doit être affiché ou non
  label: PropTypes.string, // Texte du label
  type: PropTypes.string, // Type du sélecteur
};

// Définition des valeurs par défaut pour les props non fournies
Select.defaultProps = {
  onChange: () => null, // Fonction vide par défaut
  titleEmpty: false, // "Toutes" n'est pas affiché par défaut
  label: "", // Pas de label par défaut
  type: "normal", // Type normal par défaut
  name: "select", // Nom par défaut
};

export default Select; // Exporte le composant Select pour une utilisation externe
