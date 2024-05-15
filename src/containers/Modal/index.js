import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened); // État local pour contrôler l'ouverture et la fermeture du modal
  return (
    <>
      {children({ isOpened, setIsOpened })} {/* Rendu de l'enfant (probablement un bouton) pour déclencher l'ouverture du modal */}
      {isOpened && ( // Condition pour afficher le modal
        <div className="modal">
          <div className="content">
            {Content} {/* Le contenu du modal */}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)} // Gère la fermeture du modal
            >
              <Icon name="close" /> {/* Bouton de fermeture du modal */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false, // Valeur par défaut de la prop 'opened'
}

Modal.propTypes = {
  opened: PropTypes.bool, // Prop 'opened' doit être un booléen
  Content: PropTypes.node.isRequired, // Prop 'Content' doit être un nœud React
  children: PropTypes.func.isRequired, // Prop 'children' doit être une fonction
}

export default Modal;
