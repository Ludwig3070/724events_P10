import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field"; // Import du composant Field et ses types
import Select from "../../components/Select"; // Import du composant Select
import Button, { BUTTON_TYPES } from "../../components/Button"; // Import du composant Button et ses types

// Fonction de mock pour simuler un appel API asynchrone
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false); // État pour indiquer si le formulaire est en train d'être envoyé

  // Fonction pour envoyer les données de contact
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault(); // Empêche le comportement par défaut de l'événement
      setSending(true); // Indique que l'envoi est en cours
      // Appel à la fonction de mock pour simuler un appel API
      try {
        await mockContactApi(); // Attend la résolution de la promesse de mockContactApi
        setSending(false); // Indique que l'envoi est terminé
      } catch (err) {
        setSending(false); // Indique que l'envoi est terminé en cas d'erreur
        onError(err); // Appelle la fonction onError passée en props en cas d'erreur
      }
    },
    [onSuccess, onError] // Dépendances : onSuccess et onError
  );

  return (
    <form onSubmit={sendContact}> {/* Soumission du formulaire appelle la fonction sendContact */}
      <div className="row">
        <div className="col">
          {/* Champs de saisie pour le nom, le prénom, l'email et le type de contact */}
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personnel", "Entreprise"]} // Options pour le type de contact
            onChange={() => null} // Fonction onChange, non implémentée ici
            label="Personnel / Entreprise" // Label pour le sélecteur
            type="large" // Type de sélecteur
            titleEmpty // Indique si le titre peut être vide
          />
          <Field placeholder="" label="Email" /> {/* Champ de saisie pour l'email */}
          {/* Bouton d'envoi */}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}> {/* Type de bouton : SUBMIT */}
            {sending ? "En cours" : "Envoyer"} {/* Texte du bouton selon l'état d'envoi */}
          </Button>
        </div>
        <div className="col">
          {/* Champ de saisie pour le message */}
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA} // Type TEXTAREA pour un champ de texte multiligne
          />
        </div>
      </div>
    </form>
  );
};

// Définition des types de props attendus pour le composant Form
Form.propTypes = {
  onError: PropTypes.func, // Fonction appelée en cas d'erreur lors de l'envoi
  onSuccess: PropTypes.func, // Fonction appelée en cas de succès lors de l'envoi
}

// Définition des valeurs par défaut pour les props non fournies
Form.defaultProps = {
  onError: () => null, // Fonction vide par défaut pour onError
  onSuccess: () => null, // Fonction vide par défaut pour onSuccess
}

export default Form; // Export du composant Form
