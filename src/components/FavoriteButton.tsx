import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { star, starOutline } from 'ionicons/icons';
import { useFavorites, FavoriteCity } from '../contexts/FavoritesContext';

interface FavoriteButtonProps {
  city: FavoriteCity;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ city }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(city.name);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(city.name);
    } else {
      addFavorite(city);
    }
  };

  return (
    <IonButton fill="clear" onClick={toggleFavorite}>
      <IonIcon 
        icon={isFav ? star : starOutline} 
        color={isFav ? "warning" : "medium"} 
      />
    </IonButton>
  );
};

export default FavoriteButton;
