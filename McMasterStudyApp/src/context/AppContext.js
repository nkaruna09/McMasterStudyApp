import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [visited, setVisited] = useState([]);
  const [filters, setFilters] = useState({
    noiseLevel: 'All',
    crowdedness: 'All',
    type: 'All',
    hasWifi: false,
    hasPowerOutlets: false,
    nearFood: false,
  });

  // Reviews state - organized by place ID
  // Example: { 1: [review1, review2], 2: [review3] }
  const [reviews, setReviews] = useState({});

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

  // Add a new review for a specific place
  const addReview = (placeId, review) => {
    setReviews(prev => ({
      ...prev,
      [placeId]: [review, ...(prev[placeId] || [])]
    }));
  };

  // Get reviews for a specific place
  const getReviewsForPlace = (placeId) => {
    return reviews[placeId] || [];
  };

  // Get review count for a place
  const getReviewCount = (placeId) => {
    return (reviews[placeId] || []).length;
  };

  // Calculate average rating for a place
  const getAverageRating = (placeId) => {
    const placeReviews = reviews[placeId] || [];
    if (placeReviews.length === 0) return 0;
    
    const sum = placeReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / placeReviews.length).toFixed(1);
  };

  return (
    <AppContext.Provider value={{
      favorites,
      visited,
      filters,
      reviews,
      setFilters,
      toggleFavorite,
      addVisited,
      addReview,
      getReviewsForPlace,
      getReviewCount,
      getAverageRating,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);