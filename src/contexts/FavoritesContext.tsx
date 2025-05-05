import React, { createContext, useState, useEffect, useContext } from 'react';
import { Preferences } from '@capacitor/preferences';

export interface FavoriteCity {
  name: string;
  country?: string;
}

interface FavoritesContextType {
  favorites: FavoriteCity[];
  addFavorite: (city: FavoriteCity) => Promise<void>;
  removeFavorite: (cityName: string) => Promise<void>;
  isFavorite: (cityName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  // Load favorites from storage when component mounts
  useEffect(() => {
    const loadFavorites = async () => {
      const { value } = await Preferences.get({ key: 'weatherFavorites' });
      if (value) {
        setFavorites(JSON.parse(value));
      }
    };
    
    loadFavorites();
  }, []);

  // Save favorites to storage whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      await Preferences.set({
        key: 'weatherFavorites',
        value: JSON.stringify(favorites),
      });
    };
    
    saveFavorites();
  }, [favorites]);

  const addFavorite = async (city: FavoriteCity) => {
    setFavorites(prevFavorites => {
      // Check if city already exists in favorites
      if (!prevFavorites.some(fav => fav.name.toLowerCase() === city.name.toLowerCase())) {
        return [...prevFavorites, city];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = async (cityName: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(favorite => favorite.name.toLowerCase() !== cityName.toLowerCase())
    );
  };

  const isFavorite = (cityName: string) => {
    return favorites.some(favorite => favorite.name.toLowerCase() === cityName.toLowerCase());
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
