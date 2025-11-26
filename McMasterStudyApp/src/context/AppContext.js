import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [visited, setVisited] = useState([]);
  const [filters, setFilters] = useState({
    noiseLevel: 'All',
    crowdedness: 'All',
    type: 'All',
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id) 
        : [...prev, id]
    );
  };

  const addVisited = (id) => {
    if (!visited.includes(id)) {
      setVisited([...visited, id]);
    }
  };

  return (
    <AppContext.Provider value={{
      favorites,
      visited,
      filters,
      setFilters,
      toggleFavorite,
      addVisited,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);