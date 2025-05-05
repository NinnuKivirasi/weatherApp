import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { star } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import "./Home.css";

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [weatherData, setWeatherData] = useState<{ [city: string]: any }>({});
  const [loading, setLoading] = useState<{ [city: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [city: string]: string | null }>({});

  useEffect(() => {
    // Fetch weather for all favorite cities when component mounts or favorites change
    favorites.forEach(city => {
      fetchWeather(city.name);
    });
  }, [favorites.length]); // Re-run when the number of favorites changes

  const fetchWeather = async (city: string) => {
    const API_KEY = "406cefbb7f883b23d923fd0a1c90828a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Set loading state for this city
    setLoading(prev => ({ ...prev, [city]: true }));
    setErrors(prev => ({ ...prev, [city]: null }));

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Weather information is not available");
      }

      const data = await response.json();
      setWeatherData(prev => ({ ...prev, [city]: data }));
    } catch (error: any) {
      console.log("Error", error);
      setErrors(prev => ({ ...prev, [city]: error.message || "Weather information is not available" }));
    } finally {
      setLoading(prev => ({ ...prev, [city]: false }));
    }
  };

  return (
    <>
      <IonMenu contentId="favorites-content">
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>Weather App</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding">
  </IonContent>
</IonMenu>
      <IonPage id="favorites-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Favorite Cities</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {favorites.length === 0 ? (
            <IonCard>
              <IonCardContent>
                <p>No favorite cities added yet.</p>
                <p>Go to the main page and search for cities and add them to your favorites.</p>
              </IonCardContent>
            </IonCard>
          ) : (
            <div>
              {favorites.map((city, index) => (
                <IonCard key={index}>
                  <IonCardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <IonCardTitle>{city.name}</IonCardTitle>
                      <IonButton 
                        fill="clear" 
                        color="warning" 
                        onClick={() => removeFavorite(city.name)}
                      >
                        <IonIcon slot="icon-only" icon={star} />
                      </IonButton>
                    </div>
                  </IonCardHeader>
                  <IonCardContent className="weather-card">
                    {loading[city.name] && (
                      <div className="ion-text-center">
                        <IonSpinner name="crescent" />
                        <p>Loading weather data...</p>
                      </div>
                    )}
                    
                    {errors[city.name] && (
                      <p className="ion-text-center ion-color-danger">
                        {errors[city.name]}
                      </p>
                    )}
                    
                    {weatherData[city.name] && !loading[city.name] && !errors[city.name] && (
                      <>
                        <img
                          src={`https://openweathermap.org/img/wn/${weatherData[city.name].weather[0].icon}@4x.png`}
                          alt="weather icon"
                        />
                        <p
                          style={{
                            fontSize: "large",
                            fontWeight: "bold",
                          }}
                        >
                          {weatherData[city.name].main.temp.toFixed(1)}°C -{" "}
                          {weatherData[city.name].weather[0].description}
                        </p>
                        <p style={{ marginBottom: "20px" }}>
                          Feels like: {weatherData[city.name].main.feels_like.toFixed(1)}°C
                        </p>

                        <p className="weather-info">
                          Humidity: {weatherData[city.name].main.humidity}%
                        </p>
                      </>
                    )}
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Favorites;