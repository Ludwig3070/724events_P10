import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});// fonction fournie par React qui permet de créer un contexte.



/**
 * api est un objet avec une methode loadData qui retourne  les donnees du fichier events.json en JSON
 * @namespace
 */
export const api = {
    /**
   * Charge les données à partir du fichier JSON events.json.
   * @async
   * @function loadData
   * @returns {Promise<Object>} Les données JSON chargées.
   */
  loadData: async () => {
    const json = await fetch("/events.json");// Effectue une requête pour récupérer le fichier JSON
    return json.json();// Retourne les données JSON
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
