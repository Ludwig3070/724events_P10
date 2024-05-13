

/* 
Le composant DataProvider offre plusieurs possibilités d'utilisation dans ton application :

1. Fournir des données au sein de l'application : DataProvider encapsule les données et les erreurs dans un contexte, ce qui permet à ses enfants d'accéder à ces données où qu'ils soient dans l'arbre de composants.

2. Accéder aux données et aux erreurs : En utilisant le hook useData, les composants peuvent facilement accéder aux données et aux erreurs fournies par DataProvider.

3. Appeler des méthodes API : Tu peux utiliser directement l'objet api pour appeler les méthodes définies dans celui-ci. Cela te permet d'effectuer des appels réseau et de gérer les données depuis n'importe quel composant de ton application.

4.Gérer les effets de chargement initial : DataProvider utilise useEffect pour charger les données initiales lors du premier rendu, assurant ainsi que les données sont disponibles dès que nécessaire.

En résumé, DataProvider simplifie la gestion des données et des appels API dans ton application React, offrant une approche centralisée pour la récupération et la gestion des données.
 */
import PropTypes from "prop-types"; // Import de PropTypes pour la validation des types de propriétés
import {
  createContext, // Fonction fournie par React pour créer un contexte
  useCallback,   // Hook qui retourne une version memoisée de la fonction callback fournie
  useContext,    // Hook qui permet d'accéder au contexte React
  useEffect,     // Hook qui permet d'exécuter un effet de bord après le rendu
  useState,      // Hook qui permet de créer un état local dans un composant fonctionnel
} from "react";   // Import des fonctions et hooks React nécessaires

const DataContext = createContext({}); // Création d'un contexte DataContext avec une valeur initiale vide

/**
 * api est un objet avec une methode loadData qui retourne les donnees du fichier events.json en JSON
 * @namespace
 */
export const api = {
  /**
   * Charge les données à partir du fichier JSON events.json.
   * @async
   * @function loadData
   * @returns {Promise<Object>} Les données JSON chargées.
   */
  loadData: async () => { // Méthode asynchrone qui charge les données à partir du fichier JSON
    const json = await fetch("/events.json"); // Effectue une requête pour récupérer le fichier JSON
    return json.json(); // Retourne les données JSON
  },
};

export const DataProvider = ({ children }) => { // Composant DataProvider qui fournit le contexte aux enfants
  const [error, setError] = useState(null); // État pour stocker les erreurs
  const [data, setData] = useState(null);   // État pour stocker les données

  const getData = useCallback(async () => { // Fonction memorisée pour charger les données uniquement au premier rendu 
    try {
      setData(await api.loadData()); // Charge les données à partir de l'API
      
    } catch (err) {
      setError(err); // Gère les erreurs en les stockant dans l'état
    }
  }, []); // Ne dépend d'aucune valeur extérieure
  
  useEffect(() => { // Effet de bord qui se déclenche à chaque rendu
    if (data) return; // Si les données sont déjà chargées, ne fait rien
    getData(); // Sinon, charge les données //PAS DE TABLEAU DE DEPENDANCES ?
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ // Fournit les données et les erreurs aux enfants via le contexte
        data,
        error,
      }}
    >
      {children} {/* Rendu des enfants */}
    </DataContext.Provider>
  );
};



DataProvider.propTypes = {
  children: PropTypes.node.isRequired, // Propriété children qui doit être un nœud valide
};

export const useData = () => useContext(DataContext); // Hook personnalisé pour accéder au contexte DataContext

export default DataContext; // Export par défaut du contexte DataContext
