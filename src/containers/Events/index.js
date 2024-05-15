/* Ce composant affiche une liste d'événements avec une pagination et un sélecteur de type d'événement. Il utilise également un Modal pour afficher les détails de chaque événement.

 */

import { useState } from "react";
import EventCard from "../../components/EventCard"; // Import du composant EventCard
import Select from "../../components/Select"; // Import du composant Select
import { useData } from "../../contexts/DataContext"; // Import du hook useData depuis le contexte DataContext
import Modal from "../Modal"; // Import du composant Modal
import ModalEvent from "../ModalEvent"; // Import du composant ModalEvent

import "./style.css"; // Import des styles du composant

const PER_PAGE = 9; // Nombre d'événements par page

const EventList = () => {
  const { data, error } = useData(); // Récupération des données et erreurs depuis le contexte DataContext
  const [type, setType] = useState(); // État pour le type d'événement sélectionné
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle

  // Filtrage des événements en fonction du type et de la pagination (MOFIF)
  /* Si type est défini, les événements sont filtrés pour ne conserver que ceux qui ont le même type que type. */
  /* Ensuite, les événements sont filtrés en fonction de leur position dans la pagination. Seuls les événements compris entre (currentPage - 1) * PER_PAGE (indice de début de la page) et PER_PAGE * currentPage - 1 (indice de fin de la page) sont conservés. */
  /* (!type ? data?.events : data?.events.filter(event => event.type === type)) || [] : Cela filtre les événements en fonction du type. Si type est null, undefined ou une valeur falsy, tous les événements sont conservés, sinon ils sont filtrés pour ne conserver que ceux dont le type correspond à type.

  .filter((event, index) => { ... }) : Cela filtre ensuite les événements en fonction de la pagination. Seuls les événements compris entre l'indice de début de la page et l'indice de fin de la page sont conservés.
 */
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events.filter((event) => event.type === type)) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  // Fonction pour changer le type d'événement
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialisation de la page actuelle à la première page
    setType(evtType); // Mise à jour du type d'événement sélectionné
  };

  // Calcul du nombre total de pages en fonction du nombre d'événements filtrés
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  // Création d'une liste des types d'événements uniques
  const typeList = new Set(data?.events.map((event) => event.type));

  

  return (
    <>
      {error && <div>An error occured</div>}{" "}
      {/* Affichage d'un message d'erreur en cas d'erreur */}
      {data === null ? (
        "loading" // Affichage de "loading" pendant le chargement des données
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          {/* Sélecteur de type d'événement */}
          <Select
            selection={Array.from(typeList)} // Liste des types d'événements
            onChange={(type) => (type ? changeType(type) : changeType(null))}// MODIF
          />
          {/* Liste des événements */}
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              // Modal pour afficher les détails de l'événement
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  // Carte d'événement cliquable
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                    imageAlt={event.description} // AJOUT
                  />
                )}
              </Modal>
            ))}
          </div>
          {/* Pagination */}
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // Création des liens de pagination
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
